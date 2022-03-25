import { useEffect, useState } from 'react';
import CountryFilter from './components/CountryFilter';
import CountryList from './components/CountryList';
import CountryData from './components/CountryData';
import './App.css';

function App() {
	const [countries, setCountries] = useState([]);
	const [filteredCountries, setFilteredCountries] = useState([]);
	useEffect(() => {
		fetch('https://restcountries.com/v3.1/all')
			.then(response => response.json())
			.then(countries => setCountries(countries));
	}, [])

	const displayFilterResultByConditions = (filteredCountries) => {
		if (filteredCountries.length > 10) {

			//display a text that indicates the limit of search filter
			return <p>Too many matches, specify another filter</p>
		} else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {

			//display list of countries filtered by search input
			return <CountryList
				filteredCountries={filteredCountries}
				setFilteredCountries={setFilteredCountries}
			/>
		} else if (filteredCountries.length === 1) {

			//display the basic data of the only remaining country
			//which is the result of the search filter
			return <CountryData country={filteredCountries[0]} />
		}
		return <p></p>
	}

	return (
		<div>
			<CountryFilter countries={countries} setFilteredCountries={setFilteredCountries} />
			{
				displayFilterResultByConditions(filteredCountries)
			}
		</div>
	);
}

export default App;
