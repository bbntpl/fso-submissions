const { PubSub } = require('graphql-subscriptions')
const jwt = require('jsonwebtoken')

const Book = require('./models/book')
const User = require('./models/user')
const Author = require('./models/author')

const pubsub = new PubSub()

const resolvers = {
	Query: {
		bookCount: async (root, args) => {
			const { author } = args;
			const authorDoc = await Author.findOne({ name: author });
			return await Book.countDocuments({ author: authorDoc?._id })
		},
		authorCount: async () => {
			return await Author.countDocuments()
		},
		allBooks: async (root, { author, genre }) => {
			const authorDoc = await Author.findOne({ name: author });

			if (author && genre) {
				return await Book.find({
					author: authorDoc._id,
					genres: genre
				}).populate('author');
			} else if (author) {
				return await Book.find({ author: authorDoc._id }).populate('author');
			} else if (genre) {
				return await Book.find({
					genres: genre
				}).populate('author');
			}
			return await Book.find({}).populate('author');
		},
		allAuthors: async () => {
			const authors = await Author.find({}).lean()
			const authorsWithBookCounts = await Promise.all(
				authors.map(async (author) => {
					const bookCount = await Book.countDocuments({ author: author._id })
					return {
						...author,
						bookCount: bookCount,
					}
				})
			);
			return authorsWithBookCounts;
		}
	},
	Mutation: {
		addBook: async (root, args, context) => {
			const { author, ...book } = args;
			const currentUser = context.currentUser;

			if (!currentUser) {
				throw new GraphQLError('user is not authenticated', {
					extensions: {
						code: 'BAD_USER_INPUT'
					}
				})
			}

			let authorDoc = await Author.findOne({ name: author });

			if (!authorDoc) {
				authorDoc = new Author({ name: author })
				await authorDoc.save()
					.catch(err => {
						throw new GraphQLError(err, {
							extensions: {
								code: 'BAD_USER_INPUT'
							}
						})
					});
			}

			const newBook = new Book({ ...book, author: authorDoc })
			try {
				const savedBook = await newBook.save();

				if (savedBook) {
					pubsub.publish('BOOK_ADDED', { bookAdded: savedBook });
					return savedBook;
				} else {
					throw new GraphQLError('Book could not be saved', {
						extensions: {
							code: 'BAD_USER_INPUT'
						}
					})
				}
			} catch (err) {
				throw new GraphQLError(err, {
					extensions: {
						code: 'BAD_USER_INPUT'
					}
				})
			}
		},
		editAuthor: async (root, args, context) => {
			const { name, setBornTo } = args;

			const currentUser = context.currentUser;

			if (!currentUser) {
				throw new GraphQLError('user is not authenticated', {
					extensions: {
						code: 'BAD_USER_INPUT'
					}
				})
			}

			if (!name) {
				throw new GraphQLError('name is required', {
					extensions: {
						code: 'BAD_USER_INPUT'
					}
				})
			}
			return await Author.findOneAndUpdate(
				{ name },
				{ born: setBornTo },
				{ new: true }
			);
		},
		createUser: async (root, args) => {
			const { username, favoriteGenre } = args

			if (!username) {
				throw new GraphQLError('username is required', {
					extensions: {
						code: 'BAD_USER_INPUT'
					}
				})
			}

			if (!favoriteGenre) {
				throw new GraphQLError('favorite genre is required', {
					extensions: {
						code: 'BAD_USER_INPUT'
					}
				})
			}

			const newUser = new User({
				username, favoriteGenre
			})

			await newUser.save()
				.catch(error => {
					throw new GraphQLError('Creating the user failed', {
						extensions: {
							code: 'BAD_USER_INPUT',
							invalidArgs: args.name,
							error
						}
					})
				})

			return newUser
		},
		login: async (root, args) => {
			const { username, password } = args
			const user = await User.findOne({ username })

			if (!user || password !== process.env.JWT_SECRET) {
				throw new GraphQLError('wrong credentials', {
					extensions: {
						code: 'BAD_USER_INPUT'
					}
				})
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			}

			return {
				token: jwt.sign(userForToken, process.env.JWT_SECRET),
				username: user.username,
				favoriteGenre: user.favoriteGenre
			}
		}
	},
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
		}
	}
}

module.exports = resolvers