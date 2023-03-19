import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { createNew, getAll, update } from './services/anecdote'
import {
	useQueryClient,
	useQuery,
	useMutation
} from 'react-query'

const App = () => {
	// access the client
	const queryClient = useQueryClient()

	// queries
	const query = useQuery('anecdotes', getAll)

	// mutations
	const addAnecdoteMutation = useMutation(createNew, {
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData('anecdotes')
			queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
		}
	})

	const updateAnecdoteMutation = useMutation(update, {
		onSuccess: (updatedAnecdote) => {
			const id = updatedAnecdote.id
			const anecdotes = queryClient.getQueryData('anecdotes')
			queryClient.setQueryData('anecdotes', anecdotes.map(anecdote => {
				return anecdote.id === id ? updatedAnecdote : anecdote
			}))
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
			<AnecdoteForm addAnecdoteMutation={addAnecdoteMutation}/>

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
