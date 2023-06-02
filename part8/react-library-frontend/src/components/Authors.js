import { useMutation, useQuery } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';
import { useEffect, useState } from 'react';

const Authors = (props) => {
	const [name, setName] = useState('');
	const [born, setBorn] = useState('');

	const { loading, data } = useQuery(ALL_AUTHORS);
	const [editAuthor, { error }] = useMutation(EDIT_AUTHOR, {
		refetchQueries: [{ query: ALL_AUTHORS }]
	})

	const authors = data ? data.allAuthors : [];
	const authorsWithoutBornYear = authors.filter(author => author.born === null);

	useEffect(() => {
		if (authorsWithoutBornYear.length > 0) {
			setName(authorsWithoutBornYear[0].name);
		}
	}, [authorsWithoutBornYear]);

	if (loading) {
		return <p>loading...</p>
	}

	if (error) {
		return <p>{error}</p>
	}

	if (!props.show) {
		return null
	}

	const updateAuthor = (event) => {
		event.preventDefault();

		editAuthor({
			variables: {
				name,
				setBornTo: Number(born)
			}
		})

		setName('');
		setBorn('');
	}

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
			<h2>set birthyear</h2>
			{
				authorsWithoutBornYear.length > 0 &&
				<>
					<select value={name} onChange={({ target }) => { setName(target.value); }}>
						{
							authorsWithoutBornYear.map(author => (
								<option key={author.name} value={author.name}>
									{author.name}
								</option>
							))
						}
					</select>
					<form onSubmit={updateAuthor}>
						<div>
							<label>born</label>
							<input
								value={born}
								onChange={(event) => setBorn(event.target.value)}
							/>
						</div>
						<input type='submit' value='update author' />
					</form>
				</>
			}
		</div>
	)
}

export default Authors
