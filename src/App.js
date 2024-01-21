import "./App.css";
import { useState } from "react";

const api = {
  key: "cb26e752e196e175521da66bfe318c86",
  base: "http://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setWeather(result);
      });
  };

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
          <button className="search-button" onClick={searchPressed}>
            <i class="fa fa-search"></i>
          </button>
        </div>

        <h2 className="city">Cape Town</h2>
        <p>
          <span className="day">tue </span>
          <span className="date">29</span>
          <span className="month"> jan</span>,{" "}
          <span className="hours"> 13</span>:<span className="minutes">26</span>{" "}
          , <span className="coverage"> Partly Cloudy</span>
        </p>

        <div className="temp-details row  mt-5">
          <h1 className="temp">23°</h1>
          <p>
            Humidty <span className="humidity"> 20% </span>
            Wind <span className="wind"> 20km/h </span>
            precip <span className="precip"> 44%</span>
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
      <p>{weather.name}</p>
      <p>{weather.main && weather.main.temp}</p>
      <p>{weather.weather && weather.weather[0].description}</p>
    </div>
  );
}

export default App;
