import React from 'react';

const Persons = ({ query, persons }) => {
  const personToShow =
    query === ''
      ? persons
      : persons.filter(({ name }) =>
          name.toLowerCase().includes(query.toLowerCase())
        );
  return (
    <div>
      {personToShow.map((person) => (
        <div key={person.name}>
          {person.name} : {person.number}
        </div>
      ))}
    </div>
  );
};

export default Persons;
