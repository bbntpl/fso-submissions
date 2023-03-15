import notificationReducer from '../reducers/notificationReducer'

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

describe('notificationReducer', () => {
	test('notify with message', () => {
		const state = null

		const action = {
			type: 'notification/setNotification',
			payload: 'You voted this anecdote'
		}

		const newState = notificationReducer(state, action)
		console.log(newState)
		expect(setTimeout).toHaveBeenCalledTimes(1)
		expect(newState).toMatchObject({
			timer: setTimeout,
			isTimerRunning: true,
			content: 'You voted this anecdote'
		})
		expect(newState.content).toEqual('You voted this anecdote')
	})

	test('notification lasts for 5 seconds', () => {
		const state = null

		const action = {
			type: 'notification/setNotification',
			payload: 'You voted this anecdote'
		}

		const newState = notificationReducer(state, action)
		expect(newState.content).toEqual('You voted this anecdote')
		
		expect(setTimeout).toHaveBeenCalledTimes(1);
	
		jest.setTimeout(() => {
			expect(newState).toEqual({
				timer: null,
				isTimerRunning: false,
				content: null
			})
		}, 5000)

		expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000);
	})
})