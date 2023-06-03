import { gql } from '@apollo/client';

const BOOK_DETAILS = gql`
	fragment BookDetails on Book {
		title
		published
		author {
			name
		}
		genres
	} 
`

export const BOOK_ADDED = gql`
	subscription {
		bookAdded {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`

export const ALL_AUTHORS = gql`
query {
	allAuthors {
		name
		born
		bookCount
	}
}
`

export const ALL_BOOKS = gql`
query GetAllBooks($selectedGenre: String) {
	allBooks (
		genre: $selectedGenre
	){
		...BookDetails
	}
}
${BOOK_DETAILS}
`

export const ADD_BOOK = gql`
mutation AddBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
	addBook(
		title: $title,
		published: $published,
		author: $author,
		genres: $genres
	) {
		...BookDetails
	}
}
${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql`
mutation EditAuthor($name: String!, $setBornTo: Int) {
	editAuthor(
		name: $name,
		setBornTo: $setBornTo
	) {
		name,
		born
	}
}
`

export const CREATE_USER = gql`
mutation CreateUser($username: String!, $favoriteGenre: String!) {
	createUser(
		username: $username,
		favoriteGenre: $favoriteGenre
	) {
		username,
		favoriteGenre
	}
}
`

export const LOGIN = gql`
mutation Login($username: String!, $password: String!) {
	login(
		username: $username,
		password: $password
	) {
		token,
		username,
		favoriteGenre
	}
}
` 