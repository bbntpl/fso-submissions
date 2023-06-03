import { useLazyQuery, useSubscription } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_BOOKS, BOOK_ADDED } from '../queries'

export default function Recommendations(props) {

	const { show, user } = props
	const [books, setBooks] = useState([])

	const [getAllBooks, { loading, data }] = useLazyQuery(ALL_BOOKS)
	const { data: newData } = useSubscription(BOOK_ADDED)

	useEffect(() => {
		if (newData && newData.bookAdded) {
			setBooks(previousBooks => ([
				...previousBooks,
				newData.bookAdded
			]))
		}
	}, [newData])


	useEffect(() => {
		if (user) {
			getAllBooks({
				variables: {
					selectedGenre: user.favoriteGenre
				}
			})
		}
	}, [getAllBooks])

	useEffect(() => {
		if (data && data.allBooks) {
			setBooks(data.allBooks)
		}
	}, [data])

	if (!show) {
		return null
	}

	if (loading) {
		return <p>loading...</p>
	}

	return <div>
		<h2>recommendations</h2>
		<p>books in your favorite genre <strong>{user.favoriteGenre}</strong></p>
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
	</div>
}