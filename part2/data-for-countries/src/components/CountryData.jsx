import CountryWeather from './CountryWeather';

const CountryData = ({ country }) => {
	const { name, languages, flags, capital, area } = country;
	const displayLanguagesList = () => {
		const listOfLangEls = [];
		for (let key in languages) {
			listOfLangEls.push(<li key={key}>{languages[key]}</li>);
		}
		return listOfLangEls;
	}
	return (
		<div>
			<h1>{name.common}</h1>
			<p>{`capital: ${capital[0]}`}</p>
			<p>{`area: ${area}`}</p>
			<h3>languages:</h3>
			<ul>
				{displayLanguagesList()}
			</ul>
			<img alt={`${name} /'s flag`} src={flags.png} />
			<CountryWeather country={country} />
		</div>
	)
}

export default CountryData;