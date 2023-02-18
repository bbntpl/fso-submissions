import { useState, useEffect } from 'react';
import Display from './components/Display';

const countriesApiUrl = 'https://restcountries.com/v3.1/all';

const getCountriesAPI = () => {
	const promise = fetch(countriesApiUrl);
	return promise.then(response => response.json());
}

function App() {
	const [filterKeyword, setFilterKeyword] = useState('');
	const [countries, setCountries] = useState(null);

	const initializeCountries = () => {
		getCountriesAPI().then(initialData => {
			setCountries(initialData);
		})
	}

	useEffect(initializeCountries, []);

	const handleChange = (event) => {
		setFilterKeyword(event.target.value);
	}

	return (
		<div className="App">
			<p>find countries <input onChange={handleChange} value={filterKeyword} /></p>
			{
				(countries !== null && filterKeyword) &&
				<Display
					filterKeyword={filterKeyword}
					countries={countries}
				/>
			}
		</div>
	);
}

export default App;
