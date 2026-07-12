import Forecast from "./components/Forecast";
import "./App.css";
import axios from "axios";
import { useState } from "react";

import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (city.trim() === "") {
      setError("Please enter a city");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      const response = await axios.get(url);

      setWeather(response.data);
      const forecastUrl =
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

const forecastResponse = await axios.get(forecastUrl);

setForecast(forecastResponse.data.list);
    } catch (err) {
      setError("City not found");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          setLoading(true);
          setError("");

          const { latitude, longitude } = position.coords;

          const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

          const response = await axios.get(url);

          setWeather(response.data);
          setCity(response.data.name);
        } catch (err) {
          setError("Unable to fetch location weather.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location permission denied.");
      }
    );
  };

  const today = new Date();

  const date = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const time = today.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="container">
      <div className="weather-card">
        <h1>Weather App</h1>
        

        <SearchBar
          city={city}
          setCity={setCity}
          getWeather={getWeather}
          getCurrentLocation={getCurrentLocation}
        />

        {loading && <Loader />}

        <ErrorMessage error={error} />

        <WeatherCard
          weather={weather}
          date={date}
          time={time}
        />
        <Forecast forecast={forecast} />
      </div>
    </div>
  );
}

export default App;