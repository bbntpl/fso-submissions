import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { ADD_BOOK, ALL_BOOKS } from '../queries'

const NewBook = (props) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [published, setPublished] = useState('')
	const [genre, setGenre] = useState('')
	const [genres, setGenres] = useState([])
	const [addedBooks, setAddedBooks] = useState([]);
	const [addBook, { loading, error }] = useMutation(ADD_BOOK, {
		update: (cache, response) => {
			cache.updateQuery({ query: ALL_BOOKS }, (data) => {
				const allBooks = data?.allBooks || []
				return {
					allBooks: allBooks.concat(response.data.addBook),
				}
			})
		},
	})

	if (!props.show) {
		return null
	}

	if (error) {
		const errors = error.graphQLErrors;
		return errors.map(err => {
			return <p key={err}>{err.message}</p>
		})
	}

	if (loading) return 'Submitting...';

	const submit = async (event) => {
		event.preventDefault()
		const addedBook = addBook({
			variables: {
				title,
				author,
				published: Number(published),
				genres
			},
		})

		addedBook.then(result => {
			setAddedBooks(addedBooks => ([
				...addedBooks,
				result.data.addBook
			]))

			const bookTitle = result.data.addBook.title
			console.log(bookTitle)
			props.setNotifMessages(
				[`Successfully added ${bookTitle}`],
				'success'
			)
		})

		setTitle('')
		setPublished('')
		setAuthor('')
		setGenres([])
		setGenre('')
	}

	const addGenre = () => {
		setGenres(genres.concat(genre))
		setGenre('')
	}

	return (
		<div>
			<form onSubmit={submit}>
				<div>
					title
					<input
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author
					<input
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					published
					<input
						type="number"
						value={published}
						onChange={({ target }) => setPublished(target.value)}
					/>
				</div>
				<div>
					<input
						value={genre}
						onChange={({ target }) => setGenre(target.value)}
					/>
					<button onClick={addGenre} type="button">
						add genre
					</button>
				</div>
				<div>genres: {genres.join(' ')}</div>
				<button type="submit">create book</button>
			</form>
			<h2>Books recently added</h2>
			<ul>
				{
					addedBooks.map((book) => {
						return <li key={book.title}>{book.title} - {book.published}</li>
					})
				}
			</ul>
		</div>
	)
}

export default NewBook