import { useState } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Recommendations from './components/Recommendations'

const App = () => {
	const [page, setPage] = useState('authors')
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem('loggedUser')) || null
	)
	const [errors, setErrors] = useState([])

	const handleLogout = () => {
		localStorage.clear()
		setUser(null)
		setPage('login')
	}

	const loginUser = (page, user) => {
		setPage(page)
		setUser(user)
	}

	const notifyUser = (errors) => {
		setErrors(errors)
		setTimeout(() => {
			setErrors([])
		}, 5000)
	}

	return (
		<div>
			<div>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				{
					user && user?.token
						?
						<>
							<button onClick={() => setPage('recommendations')}>recommendations</button>
							<button onClick={() => setPage('add')}>add book</button>
							<button onClick={handleLogout}>logout</button>
						</>
						: <button onClick={() => setPage('login')}>login</button>
				}
			</div>
			<Notification errors={errors} />
			<Authors show={page === 'authors'} />

			<Books show={page === 'books'} />

			<NewBook show={page === 'add'} />

			<Recommendations
				show={page === 'recommendations'}
				user={user}
			/>

			<LoginForm
				setErrors={notifyUser}
				show={page === 'login'}
				loginUser={loginUser}
			/>
		</div>
	)
}

export default App