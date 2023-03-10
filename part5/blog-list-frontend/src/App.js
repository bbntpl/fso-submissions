import { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login';

import Login from './components/Login';
import Blogs from './components/Blogs';
import UserDetails from './components/UserDetails';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './lib/Togglable';

const App = () => {
	const blogFormRef = useRef()

	const initNotifObject = {
		message: null,
		type: 'error'
	}

	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [notifObject, setNotifObject] = useState(initNotifObject);

	const createBlog = (newBlog) => {
		blogService.createBlog(newBlog)
			.then(data => setBlogs(blogs => {
				console.log(data)
				return [...blogs, data]
			}))
			.catch(exceptions => {
				notify(exceptions.response.data.error)
			})

		blogFormRef.current.toggleVisibility();
		notify(`Added "${newBlog.title}" by ${newBlog.author}`, 'success');
	}

	const updateBlog = (id, newBlog) => {
		blogService.updateBlog(id, newBlog)
			.then(updatedBlog => {
				setBlogs(blogs => blogs.map(blog => {
					return id === blog.id ? { ...updatedBlog } : blog
				}))
			})
			.catch(exceptions => {
				notify(exceptions.response.data.error || exceptions.message)
			})
	}

	const deleteBlog = (blogId, blog) => {
		blogService.deleteBlog(blogId)
			.then(() => {
				setBlogs(blogs => blogs.filter(blog => {
					return blogId !== blog.id
				}))
				notify(`Successfully deleted ${blog.title} by ${blog.author}`)
			})
			.catch(exceptions => {
				notify(exceptions.response.data.error || exceptions.message)
			})
	}

	const getBlogs = () => {
		blogService.getAll().then(blogs => {
			setBlogs(blogs);
			console.log('# of blogs: ', blogs.length);
		})
	}

	useEffect(() => getBlogs(), [])
	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const notify = (message, type) => {
		setNotifObject(notifObject => ({
			...notifObject,
			message,
			type
		}))
		setTimeout(() => {
			setNotifObject({ ...initNotifObject })
		}, 5000)
	}

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username, password,
			})
			window.localStorage.setItem('loggedUser', JSON.stringify(user));

			blogService.setToken(user.token);
			setUser(user);
			setUsername('');
			setPassword('');
			notify(
				`${user.name || user.user} successfully logged in!`,
				'success'
			)
		} catch (exception) {
			notify(exception.response.data.error || 'Wrong username of password');
		}
	}

	const loginHandlers = {
		submitUserCredentials: handleLogin,
		changeUsername: ({ target }) => {
			const usernameInput = target.value
			setUsername(usernameInput);
		},
		changePassword: ({ target }) => {
			const pwdInput = target.value
			setPassword(pwdInput);
		}
	}

	return (
		<>
			<h1>
				{
					user === null
						? 'log in to application'
						: 'blogs'
				}
			</h1>
			<Notification
				message={notifObject.message}
				type={notifObject.type}
			/>
			<div>
				{
					user === null
						? <Login
							loginHandlers={loginHandlers}
							username={username}
							password={password}
						/>
						: <div>
							<UserDetails
								name={user.name || user.username}
								logoutUser={() => {
									setUser(null);
									window.localStorage.removeItem('loggedUser');
								}}
							/>
							<Togglable
								buttonLabel='create new blog'
								ref={blogFormRef}
							>
								<BlogForm
									createBlog={createBlog}
									updateBlogs={getBlogs}
								/>
							</Togglable>
							<Blogs
								blogs={blogs}
								updateBlog={updateBlog}
								deleteBlog={deleteBlog}
							/>
						</div>
				}
			</div>
		</>
	)
}

export default App