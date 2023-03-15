import { useDispatch, useSelector } from 'react-redux'
import { voteAt } from '../reducers/anecdoteReducer';

export const AnecdoteList = () => {
	const anecdotes = useSelector(anecdotes => anecdotes.sort((a, b) => {
		return b.votes - a.votes;
	}))

	const dispatch = useDispatch()

	const vote = (id) => {
		dispatch(voteAt(id))
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
