//middleware joka hakee requestin headerin authorization kohdasta tokenin

const User = require("../models/user");
const jwt = require("jsonwebtoken");

//token sijoitetaan token muuttujaan ja requestin bodyn tokeniin
const tokenExtractor = (req, res, next) => {
  const token = req.get("authorization");
  if (token && token.startsWith("Bearer")) {
    req.body.token = token.replace("Bearer ", "");
  }

  next();
};

const userExtractor = async (req, res, next) => {
  console.log(req.body);
  if (req.body.token) {
    const decodedToken = jwt.verify(req.body.token, process.env.SECRET);
    const user = await User.findById(decodedToken.id);
    req.body.user = user;
  }

  next();
};

module.exports = {
  tokenExtractor,
  userExtractor,
};
