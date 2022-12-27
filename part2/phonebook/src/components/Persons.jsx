import React from 'react';

const Persons = ({ query, persons, onClick }) => {
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
          <button onClick={() => onClick(person.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
