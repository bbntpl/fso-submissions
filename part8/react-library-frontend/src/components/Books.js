import { useLazyQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from '../queries'
import { useState, useEffect } from 'react';

const Books = (props) => {
	const [getAllBooks, { loading, data }] = useLazyQuery(ALL_BOOKS);
	const { data: newData } = useSubscription(BOOK_ADDED)
	const [selectedGenre, setSelectedGenre] = useState('')
	const [availableGenres, setAvailableGenres] = useState([])
	const [books, setBooks] = useState([])

	useEffect(() => {
		getAllBooks({
			variables: { selectedGenre }
		})
	}, [selectedGenre, getAllBooks])

	useEffect(() => {
		if (newData && newData.bookAdded) {
			const genres = newData.bookAdded.genres
			if (!selectedGenre || genres.includes(selectedGenre)) {
				setBooks(books => ([
					...books,
					newData.bookAdded
				]))
			}
		}
	}, [newData])

	useEffect(() => {
		if (data && data.allBooks) {
			setBooks(data.allBooks)
		}
	}, [data])

	useEffect(() => {
		const genreSet = new Set();
		books.forEach(book => {
			if (Array.isArray(book.genres)) {
				book.genres.forEach(genre => {
					genreSet.add(genre);
				});
			}
		});
		setAvailableGenres([...genreSet]);
	}, [books]);


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
