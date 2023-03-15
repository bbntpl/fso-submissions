export const anecdotesAtStart = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const generateId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
	return {
		content: anecdote,
		id: generateId(),
		votes: 0
	}
}

export const createAnecdote = (content) => ({
	type: 'ADD',
	payload: { content },
})

export const voteAt = (id) => ({
	type: 'VOTE',
	payload: { id },
})

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
	console.log('state now: ', state)
	console.log('action', action)
	switch (action.type) {
		case 'VOTE':
			const id = action.payload.id
			return state.map(anecdote => {
				if (id === anecdote.id) {
					return { ...anecdote, votes: anecdote.votes + 1 }
				}
				return anecdote;
			})
		case 'ADD':
			const newAnecdote = action.payload.content;
			return state.concat(asObject(newAnecdote))
		default:
			return state
	}
}

export default reducer