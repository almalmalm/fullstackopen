import axios from 'axios';

// base url init
const baseUrl = 'https://phonebook-lkalinin.onrender.com/api/persons';

//Get all contacts
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

//Create a new contact
const createContact = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

//Update a contact
const updateContact = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

//Delete a contact
const deleteContact = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, createContact, updateContact, deleteContact };
