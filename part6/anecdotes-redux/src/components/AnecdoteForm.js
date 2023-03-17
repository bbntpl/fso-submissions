import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notifyUser } from '../reducers/notificationReducer'

export const AnecdoteForm = () => {
	const dispatch = useDispatch()
	
	const addAnecdote = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value;
		event.target.anecdote.value = ''
		dispatch(createAnecdote(content))
		dispatch(notifyUser(`You added ${content}`, 2))
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div><input name='anecdote' /></div>
				<button type='submit'>create</button>
			</form>
		</div>
	)
}