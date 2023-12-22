//middleware joka hakee requestin headerin authorization kohdasta tokenin

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const logger = require("./logger");

//token sijoitetaan token muuttujaan ja requestin bodyn tokeniin
const tokenExtractor = (req, res, next) => {
  const token = req.get("authorization");
  if (token && token.startsWith("Bearer")) {
    req.body.token = token.replace("Bearer ", "");
  }

  next();
};

const userExtractor = async (req, res, next) => {
  if (req.body.token) {
    const decodedToken = jwt.verify(req.body.token, process.env.SECRET);
    const user = await User.findById(decodedToken.id);
    req.body.user = user;
  }

  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  logger.error("message:" + error.message);
  logger.error("name" + error.name);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({
      error: "invalid token",
    });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }

  next(error);
};

module.exports = {
  tokenExtractor,
  userExtractor,
  errorHandler,
  unknownEndpoint,
};
