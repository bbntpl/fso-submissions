import { useState } from 'react'

import {
	Routes,
	Route,
	useMatch
} from 'react-router-dom'

import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import CreateNew from './components/CreateNew'
import Footer from './components/Footer'
import About from './components/About'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'

const App = () => {
	const [anecdotes, setAnecdotes] = useState([
		{
			content: 'If it hurts, do it more often',
			author: 'Jez Humble',
			info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
			votes: 0,
			id: 1
		},
		{
			content: 'Premature optimization is the root of all evil',
			author: 'Donald Knuth',
			info: 'http://wiki.c2.com/?PrematureOptimization',
			votes: 0,
			id: 2
		}
	])

	const [notifications, setNotifications] = useState([])

	const setNotification = (text) => {
		const len = notifications.length
		const id = len ? Number(notifications[len - 1].id) + 1 : 1
		setNotifications(notifications =>
			[...notifications.concat({ text, id })]
		)

		setTimeout(() => {
			removeNotification(id)
		}, 5000)
	}

	const removeNotification = (id) => {
		setNotifications(notifications =>
			[...notifications.filter(n => n.id !== id)]
		)
	}

	const addNew = (anecdote) => {
		anecdote.id = Math.round(Math.random() * 10000)
		setAnecdotes(anecdotes.concat(anecdote))
	}

	const anecdoteById = (id) =>
		anecdotes.find(a => a.id === Number(id))

	const vote = (id) => {
		const anecdote = anecdoteById(id)

		const voted = {
			...anecdote,
			votes: anecdote.votes + 1
		}

		setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
	}

	const match = useMatch('/anecdotes/:id')
	const anecdote = match ? anecdoteById(match.params.id) : null

	return (
		<div>
			<Menu />
			<Notification notifications={notifications}/>
			<h1>Software anecdotes</h1>
			<Routes>
				<Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} />} />
				<Route
					path='/create'
					element={<CreateNew addNew={addNew} setNotification={setNotification} />}
				/>
				<Route path='/about' element={<About />} />
				<Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
			</Routes>
			<Footer />
		</div>
	)
}

export default App
