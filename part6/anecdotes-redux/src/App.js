import { useSelector } from 'react-redux'
import { AnecdoteForm } from './components/AnecdoteForm'
import { AnecdoteList } from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
	const notification = useSelector(state => state.notification)
	const recentNotification = notification.length
		? notification[notification.length - 1].content
		: ''
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