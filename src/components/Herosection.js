import React, { useState } from "react";
import "../styling/herosection.css";
import sunny from "../images/sunny.PNG";
import rainy from "../images/rain.PNG";
import cloudy from "../images/cloudy.PNG";
import wind from "../images/strong wind.PNG";
import clearnight from "../images/clearnight.PNG";
import cloudynight from "../images/cloudynight.PNG";
import rainynight from "../images/rainynight.PNG";
import windynight from "../images/windynight.PNG";
import mistday from "../images/mist.PNG";
import mistnight from "../images/mistnight.PNG";



const WeatherApp = () => {
  const apikey = "2452c4a4e5331a783af6ffdd6a0a6cb7"; // Replace with your API key
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(cloudy);

  const search = async () => {
    const cityInput = document.querySelector(".cityInput");
    if (!cityInput.value) {
      setError("Please enter a city");
      setWeatherData(null);
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apikey}`;
      const response = await fetch(url);

      if (response.status !== 200) {
        setError("City not found");
        setWeatherData(null);
        setWeatherIcon(cloudy);
        return;
      }

      const data = await response.json();

      setWeatherData(data);
      setError(null);

      // Set weather icon based on the icon code from API response
      const iconCode = data.weather[0].icon;
      setWeatherIcon(getWeatherIcon(iconCode));
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching weather data.");
      setWeatherData(null);
    }
  };

  const getWeatherIcon = (iconCode) => {

      if (iconCode.startsWith("01d")) {
        return sunny;
      } else if (iconCode.startsWith("01n")) {
        return clearnight;
      } else if (iconCode.startsWith("02d")) {
        return cloudy;
      } else if (iconCode.startsWith("02n")) {
        return cloudynight;
      } else if (iconCode.startsWith("03d")) {
        return cloudy;
      } else if (iconCode.startsWith("03n")) {
        return cloudynight;
      } else if (iconCode.startsWith("04d")) {
        return cloudy;
      } else if (iconCode.startsWith("04n")) {
        return cloudynight;
      } else if (iconCode.startsWith("09d")) {
        return rainy;
      } else if (iconCode.startsWith("09n")) {
        return rainynight;
      } else if (iconCode.startsWith("10d")) {
        return rainy;
      } else if (iconCode.startsWith("10n")) {
        return rainynight;
      } else if (iconCode.startsWith("11d")) {
        return wind;
      } else if (iconCode.startsWith("11n")) {
        return windynight;
      } else if (iconCode.startsWith("50d")) {
        return mistday;
      } else if (iconCode.startsWith("50n")) {
        return mistnight;
      } else {
        return sunny; // Default icon
      }
  };

  return (
    <>
      <div className="card">
        <div className="search">
          <input
            type="search"
            placeholder="Enter your city"
            spellCheck="true"
            className="cityInput"
          />
          <i
            className="fa-solid fa-magnifying-glass searchicon"
            onClick={search}
          ></i>
        </div>
        <div className="error">{error && <p>{error}</p>}</div>
        {weatherData && (
          <div className="weather">
            <img
              src={weatherIcon}
              alt="sunny_weather_image"
              className="weather-icon"
            />
            <h1 className="temp">{Math.round(weatherData.main.temp)}°C</h1>
            <h2 className="city">{weatherData.name}</h2>
            <div className="details">
              <div className="col">
                <i className="fa-solid fa-droplet fa-2xl othericon"></i>
                <div>
                  <p>Humidity</p>
                  <pre className="humidity">{weatherData.main.humidity}%</pre>
                </div>
              </div>
              <div className="col">
                <i className="fa-solid fa-wind fa-2xl othericon"></i>
                <div>
                  <p>Wind speed</p>
                  <pre className="wind">{weatherData.wind.speed} km/hr</pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WeatherApp;
