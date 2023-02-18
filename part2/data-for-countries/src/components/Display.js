import CountryInfo from './CountryInfo';
import CountryList from './CountryList';

const Display = ({ filterKeyword, countries }) => {
	const filteredCountries = countries.filter(country => {
		const countryName = country.name.common.toUpperCase();
		return countryName.includes(filterKeyword.toUpperCase());
	});

	if (filteredCountries.length > 10) {
		return <p>Too many matches, specify another filter keyword</p>
	} else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
		return (
			<CountryList
				countries={filteredCountries}
			/>)
	} else if (filteredCountries.length === 1) {
		return <CountryInfo country={filteredCountries[0]} />
	}
}

export default Display;