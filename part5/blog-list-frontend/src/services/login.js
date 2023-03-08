import axios from 'axios';
const baseUrl = '/api/login'

const login = async (userCredentials) => {
	const response = await axios.post(baseUrl, userCredentials)
	return response.data;
}

const loginService = { login };

export default loginService