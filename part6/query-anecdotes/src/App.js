import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { createNew, getAll, update } from './services/anecdote'
import {
	useQueryClient,
	useQuery,
	useMutation
} from 'react-query'
import { useNotify } from './NotificationContext'

const App = () => {
	// custom hook that notify user for 5 seconds
	const notifyUser = useNotify()

	// access the client
	const queryClient = useQueryClient()

	// queries
	const query = useQuery('anecdotes', getAll)

	// mutations
	const addAnecdoteMutation = useMutation(createNew, {
		onSuccess: (newAnecdote) => {
			const { content } = newAnecdote
			const anecdotes = queryClient.getQueryData('anecdotes')
			queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
			notifyUser(`You have added ${content}`)
		},
		onError: (err) => notifyUser(err.response.data.error)
	})

	const updateAnecdoteMutation = useMutation(update, {
		onSuccess: (updatedAnecdote) => {
			const { id, content } = updatedAnecdote
			const anecdotes = queryClient.getQueryData('anecdotes')
			queryClient.setQueryData('anecdotes', anecdotes.map(anecdote => {
				return anecdote.id === id ? updatedAnecdote : anecdote
			}))
			notifyUser(`You have voted ${content}`)
		}
	})

	const handleVote = (anecdote) => {
		const updatedAnecdote = {
			...anecdote,
			votes: anecdote.votes + 1
		}
		updateAnecdoteMutation.mutate(updatedAnecdote)
	}

	if (query.isLoading) {
		return <div>... loading</div>
	}

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm addAnecdoteMutation={addAnecdoteMutation} />

			{query.data
				.sort((a, b) => b.votes - a.votes)
				.map(anecdote =>
					<div key={anecdote.id}>
						<div>
							{anecdote.content}
						</div>
						<div>
							has {anecdote.votes}
							<button onClick={() => handleVote(anecdote)}>vote</button>
						</div>
					</div>
				)
			}
		</div>
	)
}

export default App
