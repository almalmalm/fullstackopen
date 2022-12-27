import { useState } from 'react';
import Form from './components/Form';
import Search from './components/Filter';
import Persons from './components/Persons';
import axios from 'axios';
import { useEffect } from 'react';
import contactsService from './services/contacts';

const App = () => {
  // State init
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [query, setQuery] = useState('');

  //Get all contacts
  useEffect(() => {
    contactsService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  // Add new contact
  const addContact = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    // Check for all fields is filled
    if (newName === '' || newNumber === '') {
      alert(`Please, fill all fields`);
    } else if (persons.find(({ name }) => name === newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      setNewNumber('');
    } else {
      contactsService.createContact(newPerson).then((returnedContact) => {
        setPersons(persons.concat(returnedContact));
        setNewName('');
        setNewNumber('');
      });
    }
  };

  // Fields entering functionalities
  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleQuery = (event) => {
    setQuery(event.target.value);
  };

  // App UI
  return (
    <div>
      <h1>Phonebook</h1>
      <Search value={query} onChange={handleQuery} />
      <h3>Add a new contact</h3>
      <Form
        nameValue={newName}
        phoneValue={newNumber}
        nameOnChange={handleNewNameChange}
        phoneOnChange={handleNewNumberChange}
        onSubmit={addContact}
      />
      <h3>Contacts</h3>
      <Persons query={query} persons={persons} />
    </div>
  );
};

export default App;
