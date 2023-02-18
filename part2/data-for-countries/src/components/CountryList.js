import { useState } from 'react';
import CountryInfo from './CountryInfo';

const CountryList = ({ countries }) => {
	const [displayedCountries, setDisplayedCountries] = useState([]);

	return (
		<div>
			{
				countries.map(country => {
					const countryName = country.name.common;
					const countryKey = country.cca2;
					const isCountryDisplayed = displayedCountries.some(country => country === countryName);
					
					// toggle show/hide the info of country
					const toggleCountryInfo = () => {
						if(isCountryDisplayed) {
							setDisplayedCountries(displayedCountries => {
								return displayedCountries.filter(displayedCountry => {
									return displayedCountry !== countryName;
								});
							})
						} else {
							setDisplayedCountries(displayedCountries.concat(countryName));
						}
					};
					
					return (
						<div key={countryKey} >
							{countryName}
							<button onClick={toggleCountryInfo}>
								{isCountryDisplayed ? 'hide' : 'show'}
							</button>
							{isCountryDisplayed ? <CountryInfo country={country} /> : null}
						</div>
					)
				})
			}
		</div>
	)
}

export default CountryList;