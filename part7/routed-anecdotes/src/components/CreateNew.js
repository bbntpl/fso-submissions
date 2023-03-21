import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/useField'

const CreateNew = ({ addNew, setNotification }) => {
	const { handleReset: contentHandleReset, ...content } = useField('text')
	const { handleReset: authorHandleReset, ...author } = useField('text')
	const { handleReset: infoHandleReset, ...info } = useField('text')
	const navigate = useNavigate()

	const resetFields = (e) => {
		e.preventDefault(e)
		contentHandleReset()
		authorHandleReset()
		infoHandleReset()
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		addNew({
			content: content.value,
			author: author.value,
			info: info.value,
			votes: 0
		})
		resetFields(e)
		navigate('/');
		setNotification(`You have added ${content.value}`)
	}

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content
					<input name='content' {...content} />
				</div>
				<div>
					author
					<input name='author' {...author} />
				</div>
				<div>
					url for more info
					<input name='info' {...info} />
				</div>
				<button type='submit'>create</button>
				<button type='reset' onClick={(e) => resetFields(e)}>reset</button>
			</form>
		</div >
	)
}

export default CreateNew