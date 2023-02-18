const WeatherInfo = ({ countryWeather }) => {
	const { name, wind, weather } = countryWeather;
	const { icon, description } = weather[0];

	const kelvinToCelciusTemp = (kelvinTemp) => {
		return `${kelvinTemp - 273.15} Celcius`;
	}

	return (
		<div>
			<h3>Weather in {name}</h3>
			<p>temperature {kelvinToCelciusTemp}</p>
			<img
				src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
				alt={description}
			/>
			<p>Wind {wind.speed.toFixed(2)}</p>
		</div>
	)
}

export default WeatherInfo;