function WeatherCard({ weather, date, time }) {
  if (!weather) return null;

  return (
    <div className="weather-info">

      <img
  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
  alt="weather"
/>

<h2 className="city">
  {weather.name}
</h2>

<p className="country">
  {weather.sys.country}
</p>

<h1 className="temperature">
  {Math.round(weather.main.temp)}°C
</h1>

<p className="description">
  {weather.weather[0].description}
</p>

      <div className="date-time">
        <p>{date}</p>
        <p>{time}</p>
      </div>

      <div className="details">

        <div className="detail-card">
          <div className="icon">💧</div>
          <p>Humidity</p>
          <h4>{weather.main.humidity}%</h4>
        </div>

        <div className="detail-card">
          <div className="icon">🌬️</div>
          <p>Wind</p>
          <h4>{weather.wind.speed} km/h</h4>
        </div>

        <div className="detail-card">
          <div className="icon">🥵</div>
          <p>Feels Like</p>
          <h4>{Math.round(weather.main.feels_like)}°C</h4>
        </div>

        <div className="detail-card">
          <div className="icon">📈</div>
          <p>Pressure</p>
          <h4>{weather.main.pressure} hPa</h4>
        </div>

        <div className="detail-card">
          <div className="icon">🌅</div>
          <p>Sunrise</p>
          <h4>
            {new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </h4>
        </div>

        <div className="detail-card">
          <div className="icon">🌇</div>
          <p>Sunset</p>
          <h4>
            {new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </h4>
        </div>

        <div className="detail-card">
          <div className="icon">❄️</div>
          <p>Min Temp</p>
          <h4>{Math.round(weather.main.temp_min)}°C</h4>
        </div>

        <div className="detail-card">
          <div className="icon">🔥</div>
          <p>Max Temp</p>
          <h4>{Math.round(weather.main.temp_max)}°C</h4>
        </div>

      </div>

    </div>
  );
}

export default WeatherCard;