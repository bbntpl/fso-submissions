import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

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

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		voteAt(state, action) {
			const id = action.payload
			return state.map(anecdote => {
				if (id === anecdote.id) {
					return {
						...anecdote,
						votes: anecdote.votes + 1
					}
				}
				return anecdote;
			})
		},
		setAnecdotes(state, action) {
			return action.payload
		},
		addAnecdote(state, action) {
			state.push(action.payload)
		}
	}
})

export const { voteAt, setAnecdotes, addAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecodte = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecodte))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id, newObject) => {
  return async dispatch => {
    await anecdoteService.update(id, newObject)
    dispatch(voteAt(id))
  }
}

export default anecdoteSlice.reducer