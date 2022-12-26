import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Filter from './components/Filter';
import Country from './components/Country';

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

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

  const handleFilter = (event) => {
    setFilter(event.target.value);
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
              {country.name.common} <button>button</button>
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
