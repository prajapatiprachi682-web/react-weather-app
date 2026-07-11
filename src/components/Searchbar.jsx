function SearchBar({ city, setCity, getWeather, getCurrentLocation }) {
  return (
    <>
      <div className="search-box">
       <input
  type="text"
  value={city}
  onChange={(e) => setCity(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      getWeather();
    }
  }}
  placeholder="Enter city"
/>

        <button className="search-btn" onClick={getWeather}>
    Search
</button>
      </div>

      <button className="location-btn" onClick={getCurrentLocation}>
        📍 Use Current Location
      </button>
    </>
  );
}

export default SearchBar;