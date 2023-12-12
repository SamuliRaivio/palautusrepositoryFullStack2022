//app.js sisältää itse express sovelluksen
//app.js luo tietokantayhteyden ja ottaa käyttöön middlewaret
require("dotenv").config();
const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blogs");
const config = require("./utils/config");

logger.info("Connecting to ", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected successfully to the database");
  })
  .catch((error) => {
    logger.error("error connecting to the database", error.message);
  });

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);

module.exports = app;
