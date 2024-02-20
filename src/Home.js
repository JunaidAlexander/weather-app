import React from "react";
import "./Home.css";
import backgroundVideo from "../src/videos/bg.mp4";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const defaultCity = "Cape Town";

  const apiKey = "4824o763a0a4e436tb063a409ba4f083";
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query={query}&key=${apiKey}`;

  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);

  const getWeatherData = (city) => {
    setLoading(true);
    axios
      .get(`${apiUrl}&query=${encodeURIComponent(search || defaultCity)}`)
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
  return (
    <div>
      <video autoPlay muted loop>
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div className="cardm">
        <div className="card">
          <div className="search">
            <input
              type="search"
              placeholder="search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleSearchButtonClick}>
              <i class="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
          {weather.city && (
            <>
              <div className="main">
                <p>
                  <span className="main-weather">
                    <img
                      className="weather-icon"
                      src={weather.condition.icon_url}
                      alt="Weather Icon"
                    />
                    {weather.temperature.current}°C
                  </span>{" "}
                </p>
                <p className="city">
                  {" "}
                  {weather.city}, {weather.condition.description}
                </p>
              </div>
            </>
          )}
        </div>
        {weather.city && (
          <div className="card2">
            <div className="upper">
              <div className="humidity">
                <div className="humiditytext">
                  feels like <p> {weather.temperature.feels_like}</p>
                </div>
              </div>

              <div className="air">
                <div className="airtext">
                  feels like <p> {weather.temperature.feels_like}°C</p>
                </div>
              </div>
            </div>

            <div className="lower">
              <div className="aqi">
                <div className="aqitext">
                  <p>Wind</p>
                  <p>{weather.wind.speed} Km/h</p>
                </div>
              </div>

              <div className="realfeel">
                <div className="realfeeltext">
                  <p> Humid</p>
                  <p>{weather.temperature.humidity} %</p>
                </div>
              </div>

              <div className="pressure">
                <div className="pressuretext">
                  <p>Pressure</p>
                  <p> {weather.temperature.pressure}</p>
                </div>
              </div>

              <div className="card3"> {weather.condition.description}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
