function Forecast({ forecast }) {

  if (!forecast || forecast.length === 0) return null;

  return (

    <div className="forecast">

      <h3>5-Day Forecast</h3>

      <div className="forecast-container">

        {forecast
          .filter((item, index) => index % 8 === 0)
          .slice(0, 5)
          .map((day, index) => (

            <div className="forecast-card" key={index}>

              <p>
                {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </p>

              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt=""
              />

              <h4>{Math.round(day.main.temp)}°C</h4>

            </div>

          ))}

      </div>

    </div>

  );

}

export default Forecast;