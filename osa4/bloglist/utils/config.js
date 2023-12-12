require("dotenv").config();

//config hakee .env tiedostosta tietokannan URL sekä portin ja exporttaa ne käytettäväksi
const PORT = process.env.PORT;

//jos sovellus ajetaan testiympäristössä, käytetään testeille tarkoitettua omaa tietokantaa
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

module.exports = {
  PORT,
  MONGODB_URI,
};
