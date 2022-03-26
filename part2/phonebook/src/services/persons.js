import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject);
  return request.then(response => response.data);
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
}

// note: This variable is used becaused "delete" is a 
// reserved word for JS
const deleteObject = (id) => {
	const urlWithId = `${baseUrl}/${id}`;
	const request = axios.delete(urlWithId);
  return request.then(response => response.data);
}
const axiosServices = {
	getAll,
	create,
	update,
	delete: deleteObject
};

export default axiosServices;