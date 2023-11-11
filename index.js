require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

const Person = require("./models/person");
const person = require("./models/person");

morgan.token("postData", (req) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  } else {
    return "";
  }
});

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

const uknownEndpoint = (req, res) => {
  res.status(400).send({ error: "uknown endpoint" });
};

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :postData"
  )
);

let persons = [];

app.get("/", (req, res) => {
  res.send("<h1>puhelinluettelon backend</h1>");
});

app.get("/info", (req, res) => {
  const time = new Date().toString();
  Person.countDocuments({}).then((count) => {
    res.send(`<p>Phonebook has info for ${count} people</p><p>${time}</p>`);
  });
  /* const contacs = Person.count({});
  const time = new Date().toString();

  console.log(time);
  console.log(contacs);

  res.send(`<p>Phonebook has info for ${0} people</p><p>${time}</p>`); */
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  /* const nameExist = persons.find((person) => person.name === body.name);
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
  } */

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  /* const person = {
    id: Math.floor(Math.random() * 5000),
    name: body.name,
    number: body.number,
  }; */

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));

  /* const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end(); */
});

app.use(uknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
