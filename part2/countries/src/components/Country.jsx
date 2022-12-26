import React from 'react';

const Country = ({ name, capital, area, languages, flags }) => {
  return (
    <div>
      <h3>{name}</h3>
      <div>capital {capital}</div>
      <div>area {area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.values(languages).map((value) => {
          return <li key={value}>{value}</li>;
        })}
      </ul>
      <img src={flags.svg} alt="flag" width="10%" />
    </div>
  );
};

export default Country;
