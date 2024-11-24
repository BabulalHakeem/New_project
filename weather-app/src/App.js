import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; // Add the API key to a .env file
    const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try {
      const response = await axios.get(baseURL);
      setWeatherData(response.data);
      setError(""); // Clear previous error
    } catch (err) {
      setError("City not found. Please try again.");
      setWeatherData(null);
    }
  };

  const getBackgroundClass = () => {
    if (!weatherData) return "app-default";
    const temp = weatherData.main.temp;
    const weather = weatherData.weather[0].main.toLowerCase();

    if (temp > 25) {
      return "app-summer"; // Summer theme
    } else if (temp <= 25 && temp > 15) {
      return "app-spring"; // Spring theme
    } else if (temp <= 15) {
      return "app-winter"; // Winter theme
    }
    return "app-default"; // Fallback theme
  };

  return (
    <div className={`app ${getBackgroundClass()}`}>
      <div className="weather-container">
        <h1 className="title">Weather App</h1>
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input"
        />
        <button onClick={getWeather} className="button">
          Get Weather
        </button>

        {error && <p className="error">{error}</p>}

        {weatherData && (
          <div className="weather-info">
            <h2>{weatherData.name}</h2>
            <p>{weatherData.weather[0].description}</p>
            <p>{weatherData.main.temp}°C</p>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt="Weather Icon"
              className="weather-icon"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
