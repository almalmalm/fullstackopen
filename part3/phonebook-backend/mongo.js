const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://lkalinin:${password}@cluster0.xwcxilt.mongodb.net/persons?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length > 3) {
  mongoose
    .connect(url)
    .then((result) => {
      console.log('connected');
      const person = new Person({
        name: name,
        number: number,
      });

      return person.save();
    })
    .then(() => {
      console.log(`added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
    })
    .catch((err) => console.log(err));
} else {
  mongoose
    .connect(url)
    .then((result) => {
      console.log('connected');
      Person.find({}).then((result) => {
        console.log('Phonebook:');
        result.forEach((person) => {
          console.log(person.name, person.number);
        });
        mongoose.connection.close();
      });
    })
    .catch((err) => console.log(err));
}
