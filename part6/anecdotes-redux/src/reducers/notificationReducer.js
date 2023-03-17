import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
	name: 'notification',
	initialState: [],
	reducers: {
		showNotification(state, action) {
			return state.concat(action.payload);
		},
		hideNotification(state, action) {
			return state.filter(o => o.id !== action.payload)
		}
	}
});

let nextNotificationId = 0;

export const { showNotification, hideNotification } = notificationSlice.actions;

export const notifyUser = (content, seconds) => {
	return dispatch => {
		const id = nextNotificationId++
		dispatch(showNotification({id, content}))
		setTimeout(() => {
			dispatch(hideNotification(id))
		}, seconds * 1000)
	}
}

export default notificationSlice.reducer;