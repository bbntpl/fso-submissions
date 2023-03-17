import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { notifyUser, showNotificationWithTimeout } from '../reducers/notificationReducer';

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
		const anecdote = anecdotes.find(anecdote => anecdote.id === id)
		dispatch(voteAnecdote(id, {
			...anecdote,
			votes: anecdote.votes + 1 
		}))
		dispatch(notifyUser(`You voted ${anecdote.content}`, 5))
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
