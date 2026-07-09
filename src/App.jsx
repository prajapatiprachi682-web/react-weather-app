import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
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

    }
    catch (err) {

      setError("City not found");
      setWeather(null);

    }
    finally {

      setLoading(false);

    }

  };

  return (

    <div className="container">

      <div className="weather-card">

        <h1>Weather App</h1>

        <div className="search-box">

          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <button onClick={getWeather}>
            Search
          </button>

        </div>

        {loading && <p>Loading...</p>}

        {error && <p style={{ color: "red" }}>{error}</p>}

        {weather && (

          <div className="weather-info">

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather"
            />

            <h2>{weather.name}</h2>

            <h3>{weather.main.temp.toFixed(1)}°C</h3>

            <div className="details">

              <div>
                <p>Humidity</p>
                <h4>{weather.main.humidity}%</h4>
              </div>

              <div>
                <p>Wind</p>
                <h4>{(weather.wind.speed * 3.6).toFixed(1)} km/h</h4>
              </div>

            </div>

          </div>

        )}

      </div>

    </div>

  );
}

export default App;