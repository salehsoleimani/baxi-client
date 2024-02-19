
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    lat: 0,
                    lon: 0,
                    appid: 'YOUR_API_KEY_HERE',
                    units: 'metric',
                },
            });
            setWeather(response.data);
        };
        fetchWeather();
    }, []);

    if (!weather) {
        return <p>Loading weather...</p>;
    }

    return (
        <div>
            <h2>{weather.name}</h2>
            <p>{weather.weather[0].description}</p>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind speed: {weather.wind.speed} m/s</p>
        </div>
    );
};

export default Weather;