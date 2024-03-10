//käyttäjän kontrollerit
const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");

//haetaan kaikki käyttäjän tietokannasta
userRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", { title: 1, url: 1 });
  res.json(users);
});

//Luodaan uusi käyttäjä
userRouter.post("/", async (req, res) => {
  const { username, firstname, lastname, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    firstname,
    lastname,
    passwordHash,
  });

  //Salasanan pitää olla vähintään 3 merkkiä pitkä
  if (password.length > 2) {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } else {
    res.status(400).json();
  }
});

module.exports = userRouter;
