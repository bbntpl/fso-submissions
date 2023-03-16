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

export const showNotificationWithTimeout = (dispatch, content) => {
	const { showNotification, hideNotification } = notificationSlice.actions

  const id = nextNotificationId++
  dispatch(showNotification({id, content}))
  setTimeout(() => {
    dispatch(hideNotification(id))
  }, 5000)
}

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;