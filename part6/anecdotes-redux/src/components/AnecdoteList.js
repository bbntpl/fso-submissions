import { useDispatch, useSelector } from 'react-redux'
import { voteAt } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

export const AnecdoteList = () => {
	const sortedAnecdotes = (array) => {
		return array.sort((a, b) => {
			return b.votes - a.votes;
		})
	}

	const anecdotes = useSelector(({filter, anecdotes}) => {
		if(filter.length) {
			const filteredAnecdotes = anecdotes.filter(a => a.content.includes(filter))
			return sortedAnecdotes(filteredAnecdotes)
		} else {
			return sortedAnecdotes([...anecdotes])
		}
	})

	const dispatch = useDispatch()

	const vote = (id) => {
		const getAnecdote = () => anecdotes.find(anecdote => anecdote.id === id)
		dispatch(voteAt(id))
		dispatch(setNotification(`You voted ${getAnecdote().content}`))
	}

	return (
		anecdotes.map(anecdote =>
			<div key={anecdote.id}>
				<div>
					{anecdote.content}
				</div>
				<div>
					has {anecdote.votes}
					<button onClick={() => vote(anecdote.id)}>vote</button>
				</div>
			</div>
		)
	)
}
