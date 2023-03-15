import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
	name:'notification',
	initialState: {
		timer: null,
		isTimerRunning: false,
		content: null
	},
	reducers: {
		setNotification(state, action) {
			const timer = setTimeout(() => {
				return this.removeNotification()
			}, 5000)
			
			clearTimeout(timer)
			return {
				timer,
				isTimerRunning: true,
				content: action.payload
			}
		},
		removeNotification(state, action) {
			if(state.timer && state.isTimerRunning) {
				window.clearTimeout(state.timer);
			}
			return {
				timer: null,
				isTimerRunning: false,
				content: null
			}
		}
	}
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer