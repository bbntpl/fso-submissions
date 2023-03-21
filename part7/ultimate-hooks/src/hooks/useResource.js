import { useState, useEffect } from 'react'
import axios from 'axios'

const useResource = (baseUrl) => {
	const [resources, setResources] = useState([])

	let token = null

	const setToken = newToken => {
		token = `bearer ${newToken}`
	}

	const getAll = async () => {
		const response = await axios.get(baseUrl)
		return response.data
	}

	const create = async newObject => {
		const config = {
			headers: { Authorization: token },
		}

		const response = await axios.post(baseUrl, newObject, config)

		setResources(resources => (resources.concat(response.data)))
		return response.data
	}

	const update = async (id, newObject) => {
		const response = await axios.put(`${baseUrl}/${id}`, newObject)
		setResources(resources => (
			resources.map(resource => {
				if (resource.id === id) {
					return { ...resources, ...newObject }
				} else {
					return resource
				}
			})))
		return response.data
	}

	const services = {
		getAll,
		create,
		update,
		setToken
	}

	useEffect(() => {
		getAll().then(data => {
			console.log(data)
			setResources(data)
		})
	}, [])

	return [resources, services]
}

export default useResource