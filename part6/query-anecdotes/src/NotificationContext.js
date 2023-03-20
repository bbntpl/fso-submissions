import { createContext, useContext, useReducer } from 'react'

const reducer = (state, action) => {
	const id = action.payload.id
	switch (action.type) {
		case 'ADD':
			return state.concat(action.payload)
		case 'REMOVE':
			return state.filter(notifications => id !== notifications.id)
		default:
			return state
	}
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
	const notificationAndValue = useContext(NotificationContext)
	return notificationAndValue[0]
}

export const useNotificationDispatch = () => {
	const notificationAndDispatch = useContext(NotificationContext)
	return notificationAndDispatch[1]
}

export const useNotify = () => {
	const dispatch = useNotificationDispatch()

	return (text) => {
		const id = (100000 * Math.random()).toFixed(0)
		dispatch({
			type: 'ADD', payload: { text, id }
		})
		setTimeout(() => {
			dispatch({ type: 'REMOVE', payload: { id } })
		}, 5000)
	}
}

const NotificationContextProvider = (props) => {
	const [notification, dispatch] = useReducer(reducer, [])

	return (
		<NotificationContext.Provider value={[notification, dispatch]}>
			{props.children}
		</NotificationContext.Provider>
	)
}

export default NotificationContextProvider