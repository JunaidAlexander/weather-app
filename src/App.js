import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const api = {
  key: "cb26e752e196e175521da66bfe318c86",
  base: "http://api.openweathermap.org/data/2.5/",
}

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        setWeather(result);
      });
  };

  return (
    <div className="App">
      <header className='App-header'>
        <h1>Weather App</h1>
        <div>
          <input
            type="text"
            placeholder='Enter City/town...'
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>
        <p>{weather.name}</p>
        <p>{weather.main && weather.main.temp}</p>
        <p>{weather.weather && weather.weather[0].description}</p>
      </header>
    </div>
  );
}

export default App;