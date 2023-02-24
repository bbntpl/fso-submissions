import axios from 'axios';

const baseUrl = `/api/persons`;

const getAll = () => {
	const promise = axios.get(baseUrl);
	return promise.then(response => response.data);
}

const create = (newObject) => {
	const promise = axios.post(baseUrl, newObject);
	return promise.then(response => response.data);
}

const deleteItem = (id) => {;
	const promise = axios.delete(`${baseUrl}/${id}`);
	return promise.then(response => response.data);
}

const update = (id, newObject) => {
	const promise = axios.put(`${baseUrl}/${id}`, newObject);
	return promise.then(response => response.data);
}

const methods = { 
	getAll, 
	create, 
	deleteItem, 
	update, 
}

export default methods;