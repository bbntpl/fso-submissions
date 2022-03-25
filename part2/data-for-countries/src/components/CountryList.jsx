const CountryList = ({ filteredCountries, setFilteredCountries }) => {
	return (
		<div>
			{
				filteredCountries.map(country => {
					return (
						<div>
							{country.name.common} 
							<button onClick={() => setFilteredCountries([country])}>show</button>
						</div>
					)
				})
			}
		</div>
	)
}

export default CountryList;