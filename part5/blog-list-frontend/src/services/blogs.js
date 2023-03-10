import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;

const setToken = (newToken) => {
	token = `Bearer ${newToken}`;
}



const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data;
}

const createBlog = async (object) => {
	const config = {
		headers: {
			Authorization: token
		}
	}

	const response = await axios.post(baseUrl, object, config);
	return response.data;
}

const deleteBlog = async (id) => {
	const config = {
		headers: {
			Authorization: token
		}
	}

	const url = `${baseUrl}/${id}`
	const response = await axios.delete(url, config);
	return response.data;
}

const updateBlog = async (id, newObject) => {
	const config = {
		headers: {
			Authorization: token
		}
	}

	const url = `${baseUrl}/${id}`
	const response = await axios.put(url, newObject, config);
	console.log(response)
	return response.data;
}

const blogService = {
	setToken,
	getAll,
	createBlog,
	deleteBlog,
	updateBlog
}

export default blogService