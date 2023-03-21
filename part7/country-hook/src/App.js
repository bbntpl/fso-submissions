import React, { useState } from 'react'

const useField = (type) => {
	const [value, setValue] = useState('')

	const onChange = (event) => {
		setValue(event.target.value)
	}

	return {
		type,
		value,
		onChange,
	}
}

const useCountry = (name) => {
	const [country, setCountry] = useState(null)

	const onSubmit = (e) => {
		e.preventDefault()
		fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
			.then((response) => response.json())
			.then((data) => {
				setCountry({
					data: data[0],
					found: !data.length ? false : true
				})
			})
			.catch(() => setCountry(country => ({ ...country, found: false })))
	}

	return {
		country,
		onSubmit
	}
}

const Country = ({ country }) => {
	if (!country) {
		return null
	}
	
	if (!country.found) {
		return (
			<div>
				not found...
			</div>
		)
	}

	return (
		<div>
			<h3>{country.data.name.common} </h3>
			<div>capital {country.data.capital[0]} </div>
			<div>population {country.data.population}</div>
			<img src={country.data.flags.png} height='100' alt={`flag of ${country.data.name}`} />
		</div>
	)
}

const App = () => {
	const nameInput = useField('text')
	const { country, onSubmit } = useCountry(nameInput.value)
	return (
		<div>
			<form onSubmit={onSubmit}>
				<input {...nameInput} />
				<button>find</button>
			</form>

			<Country country={country} />
		</div>
	)
}

export default App