// Create .env file in the root directory of the project

import { useEffect, useState } from 'react';
import WeatherInfo from './WeatherInfo';

// Write "REACT_APP_API_KEY=YOUR_API_KEY" on the file
const api_key = process.env.REACT_APP_API_KEY

const getWeatherAPI = (url) => {
	const promise = fetch(url);
	return promise.then(response => {
		return response.json()
	});
}

const CountryInfo = ({ country }) => {
	const [countryWeather, setCountryWeather] = useState(null);
	const { area, capital, languages } = country;
	const countryName = country.name.common;

	const openWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&APPID=${api_key}`;

	const imgSrc = country.flags.png;
	const imgAlt = country.flags.alt;

	const initializeWeatherInfo = () => {
		getWeatherAPI(openWeatherApiUrl).then(weatherData => {
			setCountryWeather(weatherData);
		})
	}

	useEffect(initializeWeatherInfo, []);

	return (
		<div>
			<h1>{countryName}</h1>
			<p>capital {capital}</p>
			<p>area {area}</p>
			<p><b>languages: </b></p>
			<ul>
				{
					Object.keys(languages).map((key, index) => {
						const elementKey = `${countryName.slice(0, 2)}-${languages[key]}-${index}`;
						return <li key={elementKey}>{languages[key]}</li>
					})
				}
			</ul>
			<img src={imgSrc} alt={imgAlt} />
			{
				countryWeather !== null &&
				<WeatherInfo countryWeather={countryWeather} />
			}
		</div>
	)
}

export default CountryInfo;