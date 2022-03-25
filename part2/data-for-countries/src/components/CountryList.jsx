const CountryList = ({ filteredCountries }) => {
	return (
		<div>
			{
				filteredCountries.map(country => {
					console.log(country);
					return <p>{country.name.common}</p>
				})
			}
		</div>
	)
}

export default CountryList;