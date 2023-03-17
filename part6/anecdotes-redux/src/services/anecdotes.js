import axios from 'axios'
import { asObject } from '../reducers/anecdoteReducer'
const baseUrl= 'http://localhost:3001/anecdotes'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const createNew = async (content) => {
	const response = await axios.post(baseUrl, asObject(content))
	return response.data
}

const update = async (id, newObject) => {
	const response = await axios.put(`${baseUrl}/${id}`, newObject)
	return response.data
}

const service = {
	getAll,
	createNew,
	update
}

export default service