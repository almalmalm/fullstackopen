require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const Person = require('./models/person');

const app = express();
app.use(express.json());

morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.use(express.static('build'));
app.use(cors());

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => res.json(persons));
});

app.get('/info', (req, res) => {
  const numOfPersons = persons.length;
  const date = new Date();
  console.log(date);
  res.send(
    `<div>Phonebook has info for ${numOfPersons} people </div><div>${date}</div>`
  );
});

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then((person) => {
    res.json(person);
  });
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

// const generateId = () => {
//   const maxId =
//     persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;
//   return maxId + 1;
// };

// app.post('/api/persons', (req, res) => {
//   const body = req.body;

//   if (!body.name) {
//     return res.status(400).json({ error: 'name is missing' });
//   }
//   if (!body.number) {
//     return res.status(400).json({ error: 'number is missing' });
//   }

//   if (persons.find((person) => person.name === body.name)) {
//     return res.status(400).json({ error: 'name must be unique' });
//   }

//   const person = {
//     id: generateId(),
//     name: body.name,
//     number: body.number,
//   };

//   persons = persons.concat(person);
//   res.json(person);
// });

app.post('/api/persons', (req, res) => {
  const body = req.body;
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person.save();
  console.log(body);
  res.status(200).send({ message: `Person saved` });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
