import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = () =>
	axios.get(baseUrl).then(response => response.data)

export const createNew = (text) => {
	const anecdote = {
		content: text,
		votes: 0,
		id: (100000 * Math.random()).toFixed(0)
	}
	return axios.post(baseUrl, anecdote).then(res => res.data)
}

export const update = (updatedObject) =>
	axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject)
		.then(res => res.data)