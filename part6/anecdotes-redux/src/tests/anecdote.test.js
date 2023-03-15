import deepFreeze from 'deep-freeze';
import anecdoteReducer, {
	anecdotesAtStart,
	asObject
} from '../reducers/anecdoteReducer';

describe('anecdoteReducer', () => {
	const initialState = anecdotesAtStart.map(asObject);

	test('increment votes', () => {
		const state = [...initialState]
		deepFreeze(state)
		const action = {
			type: 'VOTE',
			payload: {
				id: state[0].id
			}
		}
		const newState = anecdoteReducer(state, action)
		expect(newState).toHaveLength(initialState.length)

		expect(newState).toContainEqual({
			...initialState[0],
			votes: 1
		})
	})

	test('add new anecdote', () => {
		const state = [...initialState]
		const newAnecdote = 'this is a new anecdote'
		const action = {
			type: 'ADD',
			payload: {
				content: newAnecdote
			}
		}

		deepFreeze(state)
		const newState = anecdoteReducer(state, action)
		expect(newState).toHaveLength(initialState.length + 1)

		expect(newState[newState.length - 1]).toHaveProperty('id')
		expect(newState[newState.length - 1]).toMatchObject({
			content: newAnecdote,
			id: expect.stringMatching(/\d{5}/g),
			votes: 0,
		})
	})
})