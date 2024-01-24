import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
// import { format } from "date-fns";

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);

  const defaultCity = "cape town";
  const apiKey = "4824o763a0a4e436tb063a409ba4f083";
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${encodeURIComponent(
    defaultCity
  )}&key=${apiKey}`;
  const getWeatherData = (city) => {
    setLoading(true);
    axios
      .get(apiUrl)
      .then((response) => {
        setWeather(response.data);
        console.log("Weather data for", city, ":", response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getWeatherData();
  }, []);
  ///    Fix timestamp to match local time of the searched city by thursday

  const formatLocalTime = (timestamp) => {
    const localTime = new Date(timestamp * 1000);
    return localTime.toLocaleTimeString([], {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    console.log(weather);
    if (searchButtonClicked) {
      getWeatherData();
    }
  }, [searchButtonClicked]);

  const handleSearchButtonClick = () => {
    setSearchButtonClicked(true);
    getWeatherData();
  };
  //  Finish coding for the weather forcast data by friday
  return (
    <div className="container-fluid p-3">
      <div className="container weather-info   p-5 mb-5 mt-3 text-center">
        <div className="search mb-5">
          <input
            className="search-input"
            type="text"
            placeholder="Enter City/town..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-button" onClick={handleSearchButtonClick}>
            <i className="fa fa-search"></i>
          </button>
        </div>
        {searchButtonClicked && (
          <div>
            {weather.city && (
              <div>
                <h2 className="city">{weather.city}</h2>
                <p className="date">
                  {formatLocalTime(weather.time)},
                  <span className="coverage">
                    {" "}
                    {weather.condition.description}
                  </span>
                </p>

                <div className="temp-details row mt-5">
                  <h1 className="temp">{weather.temperature.current}°</h1>
                  <p className="w">
                    Humidity{" "}
                    <span className="humidity">
                      {weather.temperature.humidity}%{" "}
                    </span>
                    Wind <span className="wind">{weather.wind.speed}km/h </span>
                    Pressure{" "}
                    <span className="precip">
                      {weather.temperature.pressure}
                    </span>
                  </p>
                </div>

                <div className="row mt-5 mb-5">
                  <div className="col">
                    <p>Mon</p>
                    <p>
                      <span className="low-temp">18° </span> <span> 48°</span>
                    </p>
                  </div>
                  <div className="col">
                    {" "}
                    <p>Tue</p>
                    <p>
                      <span className="low-temp">18° </span> <span> 48°</span>
                    </p>
                  </div>
                  <div className="col">
                    {" "}
                    <p>Wed</p>
                    <p>
                      <span className="low-temp">18° </span> <span> 48°</span>
                    </p>
                  </div>
                  <div className="col">
                    {" "}
                    <p>Thur</p>
                    <p>
                      <span className="low-temp">18° </span> <span> 48°</span>
                    </p>
                  </div>
                  <div className="col">
                    {" "}
                    <p>Fri</p>
                    <p>
                      <span className="low-temp">18° </span> <span> 48°</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
