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

	console.log(config);

	const response = await axios.post(baseUrl, object, config);
	return response.data;
}

const blogService = { 
	setToken,
	getAll,
	createBlog,
 }

export default blogService