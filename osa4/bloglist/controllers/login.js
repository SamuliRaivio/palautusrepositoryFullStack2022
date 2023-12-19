const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

//kirjautuminen käyttäjätilille
loginRouter.post("/", async (req, res) => {
  //käyttäjä antaa käyttäjätunnuksen (username) ja salasanan (password)
  const { username, password } = req.body;

  //haetaan oikea käyttäjä tietokannasta annetulla käyttäjänimellä
  const user = await User.findOne({ username });

  //muuttuja rightPW saa arvon true mikäli käyttäjä löytyy tietokannasta eli käyttäjätunnus on annettu oikein
  //sekä lisäksi mikäli annettu salasana täsmää löydetyn käyttäjän kryptattuun salasanaan
  const rightPW =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  //mikäli käyttäjätunnus tai salasana on väärä palautetaan status 400 ja errorviesti
  if (!(user && rightPW)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  //luodaan tokeni käyttäjälle
  const token = jwt.sign(userForToken, process.env.SECRET);

  //mikäli kaikki ok palautetaan status ok ja lähetetään eteenpäin tokeni sekä tokenia käyttävän käyttäjän tiedot.
  res.status(200).send({
    token,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
  });
});

module.exports = loginRouter;
