require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

const Person = require("./models/person");

app.use(express.static("dist"));

app.use(cors());

morgan.token("postData", (req) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  } else {
    return "";
  }
});

app.use(express.json());

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :postData"
  )
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelance",
    number: "123456789",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "987654321",
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "123123123",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>puhelinluettelon backend</h1>");
});

app.get("/info", (req, res) => {
  const contacs = persons.length;
  const time = new Date().toString();

  console.log(time);

  res.send(`<p>Phonebook has info for ${contacs} people</p><p>${time}</p>`);
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then((person) => {
    res.json(person);
  });

  //koodi jolla katotaan onko yhteystieto jo olemassa samalla nimellä
  //tällä hetkellä ei katota tätä vielä kun muutetaan tietokanta mongoDB
  /* if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  } */
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  const nameExist = persons.find((person) => person.name === body.name);
  const numExist = persons.find((person) => person.number === body.number);

  if (!body.name) {
    return res.status(400).json({
      error: "name missing",
    });
  } else if (!body.number) {
    return res.status(400).json({
      error: "number missing",
    });
  } else if (nameExist) {
    return res.status(400).json({
      error: "name must be unique",
    });
  } else if (numExist) {
    return res.status(400).json({
      error: "number must be unique",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  /* const person = {
    id: Math.floor(Math.random() * 5000),
    name: body.name,
    number: body.number,
  }; */

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
