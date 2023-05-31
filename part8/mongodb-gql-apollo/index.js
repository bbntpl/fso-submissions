const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user');
const { GraphQLError } = require('graphql');

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message)
	})

let authors = [
	{
		name: 'Robert Martin',
		id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
		born: 1952,
	},
	{
		name: 'Martin Fowler',
		id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
		born: 1963
	},
	{
		name: 'Fyodor Dostoevsky',
		id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
		born: 1821
	},
	{
		name: 'Joshua Kerievsky', // birthyear not known
		id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
	},
	{
		name: 'Sandi Metz', // birthyear not known
		id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
	},
]

let books = [
	{
		title: 'Clean Code',
		published: 2008,
		author: 'Robert Martin',
		id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
		genres: ['refactoring']
	},
	{
		title: 'Agile software development',
		published: 2002,
		author: 'Robert Martin',
		id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
		genres: ['agile', 'patterns', 'design']
	},
	{
		title: 'Refactoring, edition 2',
		published: 2018,
		author: 'Martin Fowler',
		id: "afa5de00-344d-11e9-a414-719c6709cf3e",
		genres: ['refactoring']
	},
	{
		title: 'Refactoring to patterns',
		published: 2008,
		author: 'Joshua Kerievsky',
		id: "afa5de01-344d-11e9-a414-719c6709cf3e",
		genres: ['refactoring', 'patterns']
	},
	{
		title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
		published: 2012,
		author: 'Sandi Metz',
		id: "afa5de02-344d-11e9-a414-719c6709cf3e",
		genres: ['refactoring', 'design']
	},
	{
		title: 'Crime and punishment',
		published: 1866,
		author: 'Fyodor Dostoevsky',
		id: "afa5de03-344d-11e9-a414-719c6709cf3e",
		genres: ['classic', 'crime']
	},
	{
		title: 'The Demon ',
		published: 1872,
		author: 'Fyodor Dostoevsky',
		id: "afa5de04-344d-11e9-a414-719c6709cf3e",
		genres: ['classic', 'revolution']
	},
]

/*
	you can remove the placeholder query once your first own has been implemented 
*/

const typeDefs = `
type Author {
	name: String!
	born: Int
	bookCount: Int
}	

type Book {
	title: String!
	published: Int!
	author: Author!
	genres: [String!]!
	id: ID!
}

type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
	value: String!
}

  type Query {
		bookCount(author: String): Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
		me: User
  }

	type Mutation {
		addBook(
		title: String!
		published: Int!
		author: String!
		genres: [String!]!
		): Book
		editAuthor(
			name: String!
			setBornTo: Int
		): Author
		createUser(
			username: String!
			favoriteGenre:String!
		): User
		login(
			username: String!
			password: String!
		): Token
	}
`

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
				return await Book.find({ author: authorDoc._id, genre }).populate('author');
			} else if (author) {
				return await Book.find({ author: authorDoc._id }).populate('author');
			} else if (genre) {
				return await Book.find({ genre }).populate('author');
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
			await newBook.save()
				.catch(err => {
					throw new GraphQLError(err, {
						extensions: {
							code: 'BAD_USER_INPUT'
						}
					})
				});

			return newBook;
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
				value: jwt.sign(userForToken, process.env.JWT_SECRET)
			}
		}
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

startStandaloneServer(server, {
	listen: { port: 4000 },
	context: async ({ req, res }) => {
		const auth = req ? req.headers.authorization : null
		if (auth && auth.startsWith('Bearer ')) {
			const decodedToken = jwt.verify(
				auth.substring(7), process.env.JWT_SECRET
			)

			const currentUser = await User
				.findById(decodedToken.id)

			return { currentUser }
		}


	}
}).then(({ url }) => {
	console.log(`Server ready at ${url}`)
})