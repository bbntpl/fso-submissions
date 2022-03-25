const CountryFilter = ({ countries, setFilteredCountries }) => {
	const searchForCountries = (e) => {
		//return empty array when empty
		if(!e.target.value.length) return setFilteredCountries([]);

		const searchedCountries = countries.filter(country => {
			//referencing the value of the strings as a lowercase
			const countryName = country.name.common.toLowerCase();
			const enteredStr = e.target.value.toLowerCase();
			return countryName.includes(enteredStr);
		});

		setFilteredCountries(searchedCountries);
	}
	return (
		<div>
			find countries <input onChange={searchForCountries} />
		</div>
	)
}

export default CountryFilter;