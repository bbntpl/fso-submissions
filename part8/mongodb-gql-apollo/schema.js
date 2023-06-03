const typeDefs = `
type Subscription {
	bookAdded: Book!
}

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

type LoginOutput {
	username: String!
	favoriteGenre: String!
	token: String!
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
		): LoginOutput
	}
`

module.exports = typeDefs