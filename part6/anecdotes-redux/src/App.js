import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AnecdoteForm } from './components/AnecdoteForm'
import { AnecdoteList } from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
	const dispatch = useDispatch()
	const notification = useSelector(state => state.notification)
	const recentNotification = notification.length
		? notification[notification.length - 1].content
		: ''
		
		useEffect(() => {
			dispatch(initializeAnecdotes())
		}, [dispatch])

	return (
		<div>
			<h2>Anecdotes</h2>
			{
				!!notification.length && <Notification content={recentNotification} />
			}
			<Filter />
			<AnecdoteList />
			<AnecdoteForm />
		</div>
	)
}

export default App