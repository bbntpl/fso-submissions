import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';
import { useEffect, useState } from 'react';

export default function LoginForm(props) {
	const {
		setErrors,
		show,
		loginUser
	} = props

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [login, result] = useMutation(LOGIN, {
		onError: (error) => {
			const message = error.graphQLErrors[0].message
			setErrors([message])
		}
	})

	useEffect(() => {
		if (result.data && result.data.login) {
			const user = result.data.login
			localStorage.setItem('loggedUser', JSON.stringify(user))
			loginUser('authors', user)
		}
	}, [result.data])

	if (!show) {
		return null
	}

	const handleLogin = (event) => {
		event.preventDefault()
		login({
			variables: {
				username: username.length > 0 ? username : undefined,
				password: password.length > 0 ? password : undefined
			}
		})

		setUsername('')
		setPassword('')
	}

	return <form onSubmit={handleLogin}>
		<div>
			<label htmlFor='username'>username: </label>
			<input value={username} onChange={(e) => setUsername(e.target.value)} />
		</div>
		<div>
			<label htmlFor='password'>password: </label>
			<input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
		</div>
		<input type='submit' value='login' />
	</form>
}