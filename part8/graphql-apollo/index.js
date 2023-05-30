const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

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

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
*/

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
	type Book {
		title: String!
		published: Int!
		author: String!
		genres: [String!]!
	}
	
	type Author {
		name: String!
		born: Int
		bookCount: Int
	}	

  type Query {
    dummy: Int
		bookCount(author: String): Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
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
	}
`

const resolvers = {
	Query: {
		dummy: () => 0,
		bookCount: (root, args) => {
			const { author } = args;
			return books.filter(book => book.author === author).length || 0;
		},
		authorCount: () => authors.length,
		allBooks: (root, args) => {
			return books.filter(book => {
				const bookFilter = book.author === args.author;
				const genreFilter = book.genres.includes(args.genre);
				if (!args && (bookFilter || genreFilter)) {
					return book;
				}
			});
		},
		allBooks: (root, args) => {
			if (args.author && args.genre) {
				return books.filter(book => book.author === args.author && book.genres.includes(args.genre));
			} else if (args.author) {
				return books.filter(book => book.author === args.author);
			} else if (args.genre) {
				return books.filter(book => book.genres.includes(args.genre));
			}
			return books;
		},
		allAuthors: () => authors.map(author => {
			const bookCount = books.filter(book => book.author === author.name).length;
			return {
				...author,
				bookCount: bookCount,
			}
		})
	},
	Mutation: {
		addBook: (root, book) => {
			const { author } = book;
			const isAuthorExists = authors.some(a => a.name === author);

			if (!isAuthorExists) {
				authors.push({
					name: author,
				});
			}

			books = books.concat(book);
			return book;
		},
		editAuthor: (root, author) => {
			const authorToUpdate = authors.find(a => a.name === author.name);
			if (!authorToUpdate) {
				return null;
			}
			authorToUpdate.born = author.setBornTo;
			return authorToUpdate;
		}
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

startStandaloneServer(server, {
	listen: { port: 4000 },
}).then(({ url }) => {
	console.log(`Server ready at ${url}`)
})