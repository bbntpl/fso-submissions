import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState, useEffect } from 'react';

const Books = (props) => {
	const [getAllBooks, { loading, data }] = useLazyQuery(ALL_BOOKS);
	const [selectedGenre, setSelectedGenre] = useState('')
	const [availableGenres, setAvailableGenres] = useState([])
	const [books, setBooks] = useState([])

	useEffect(() => {
		getAllBooks({
			variables: { selectedGenre }
		})
	}, [selectedGenre, getAllBooks])

	useEffect(() => {
		if (data && data.allBooks) {
			console.log(data.allBooks)
			setBooks(data.allBooks)
		}
	}, [data])

	useEffect(() => {
		setAvailableGenres(
			books.reduce((genres, book) => {
				if (Array.isArray(book.genres)) {
					const genresToBeAdded = book.genres.filter(genre => !genres.includes(genre))
					return [...genres, ...genresToBeAdded]

				}
				return genres
			}, [])
		)
	}, [books])

	if (!props.show) {
		return null
	}

	if (loading) {
		return <p>loading...</p>
	}

	return (
		<div>
			<h2>books</h2>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{books.map((a) => (
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>
			{
				availableGenres.map((genre, index) => {
					return <button
						key={index}
						onClick={() => setSelectedGenre(genre)}
					>
						{genre.toLowerCase()}
					</button>
				})
			}
			<button onClick={() => setSelectedGenre(null)}>all genres</button>
		</div>
	)
}

export default Books
