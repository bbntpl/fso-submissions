import notificationReducer from '../reducers/notificationReducer'

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

describe('notificationReducer', () => {
	const initialState = []

	test('show', () => {
		const state = initialState

		const action = {
			type: 'notification/showNotification',
			payload: {
				id: 1,
				content: 'You voted this anecdote'
			}
		}

		const newState = notificationReducer(state, action)
		expect(newState).toContainEqual({
			id: 1,
			content: 'You voted this anecdote'
		})
		expect(newState[0].content).toEqual('You voted this anecdote')
		expect(newState).toHaveLength(1)
	})

	test('hides notification', () => {
		const state = [{
			id: 1,
			content: 'You voted this anecdote'
		}]

		const action = {
			type: 'notification/hideNotification',
			payload: 1
		}

		const newState = notificationReducer(state, action)
		
		expect(newState).toHaveLength(0);
	})
})