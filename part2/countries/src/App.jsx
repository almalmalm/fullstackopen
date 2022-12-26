import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Filter from './components/Filter';
import Country from './components/Country';

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [weather, setWeather] = useState(0);
  const [wind, setWind] = useState(0);
  const [icon, setIcon] = useState('01d');

  const countriesToShow =
    filter === ''
      ? countries
      : countries.filter(({ name }) =>
          name.common.toLowerCase().includes(filter.toLowerCase())
        );

  const hook = () => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data);
    });
  };
  useEffect(hook, []);

  let lat = '0';
  let lng = '0';
  if (countriesToShow.length === 1) {
    lat = countriesToShow[0].latlng[0];
    lng = countriesToShow[0].latlng[1];
  }

  const weatherHook = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        setWeather(response.data.main.temp);
        setWind(response.data.wind.speed);
        setIcon(response.data.weather[0].icon);
      });
  };
  useEffect(weatherHook, [lat, lng]);

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleClick = (event) => {
    const countryName = event.currentTarget.parentElement.innerText.replace(
      ' show',
      ''
    );
    setFilter(countryName);
  };

  if (countriesToShow.length > 10 && filter !== '') {
    return (
      <div>
        <Filter value={filter} onChange={handleFilter} />
        <div>Too many matches, specify another filter</div>
      </div>
    );
  }

  if (countriesToShow.length < 11 && countriesToShow.length > 1) {
    return (
      <div>
        <Filter value={filter} onChange={handleFilter} />
        {countriesToShow.map((country) => {
          return (
            <div key={country.name.common}>
              {country.name.common} <button onClick={handleClick}>show</button>
            </div>
          );
        })}
      </div>
    );
  }

  if (countriesToShow.length === 1) {
    return (
      <div>
        <Filter value={filter} onChange={handleFilter} />
        {countriesToShow.map((country) => {
          return (
            <Country
              key={country.name.common}
              name={country.name.common}
              capital={country.capital}
              area={country.area}
              languages={country.languages}
              flags={country.flags}
            />
          );
        })}
        <h3>Weather in {countriesToShow[0].capital}</h3>
        <div>temperature {weather} Celcius</div>
        <div>
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="weather icon"
          />
        </div>
        <div>wind {wind} m/s</div>
      </div>
    );
  }

  return (
    <div className="App">
      <Filter value={filter} onChange={handleFilter} />
      {countriesToShow.map((country) => {
        return <div key={country.name.common}>{country.name.common}</div>;
      })}
    </div>
  );
}

export default App;
