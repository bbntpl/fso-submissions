import { useEffect, useState } from 'react';

const API_KEY = process.env.REACT_APP_API_KEY;

//api urls
const apiWeatherByCityName = (cityName, apiKey) => {
	return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
}

const apiWeatherIconByKey = (key) => {
	return `http://openweathermap.org/img/wn/${key}@2x.png`;
}

const CountryWeather = ({ country }) => {
	const [weatherData, setWeatherData] = useState('');
	useEffect(() => {
		//set the state as the weather data
		fetch(apiWeatherByCityName(country.capital[0], API_KEY))
			.then(response => response.json())
			.then(data => setWeatherData(data));
	}, []);

	const convertFromKelvinToCelcius = (K) => K - 273.15;

	return (
		<div>
			<h2>{`Weather in ${country.capital}`}</h2>
			{
				(weatherData) &&
				<>
					<p>{`temperature ${convertFromKelvinToCelcius(weatherData.main.temp).toFixed(2)} Celcius`}</p>
					<img
						alt={`weather conditions of ${country.capital}`}
						src={apiWeatherIconByKey(weatherData.weather[0].icon)
						} />
					<p>{`wind ${weatherData.wind.speed} m/s`}</p>
				</>
			}
		</div>
	)
}

export default CountryWeather;