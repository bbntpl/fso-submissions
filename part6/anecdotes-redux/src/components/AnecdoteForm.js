import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotificationWithTimeout } from '../reducers/notificationReducer'

export const AnecdoteForm = () => {
	const dispatch = useDispatch()
	
	const addAnecdote = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value;
		event.target.anecdote.value = ''
		dispatch(createAnecdote(content))
		showNotificationWithTimeout(dispatch, `You added ${content}`)
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