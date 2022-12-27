import axios from 'axios';

// base url init
const baseUrl = 'http://localhost:3001/persons';

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

export default { getAll, createContact };
