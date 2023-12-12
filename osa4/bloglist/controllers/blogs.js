//Blogs sisältää reittien määrittelyt "kontrollerit"
//exportataan blogsRouter
//ne otataan käyttöön app.js tiedostossa app.use("/api/blogs", blogsRouter)
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

//Haetaan kaikki blogi-oliot tietokannasta
blogsRouter.get("/", (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});

//luodaan uusi blogi-olio tietokantaan
blogsRouter.post("/", (req, res) => {
  const blog = new Blog(req.body);

  blog.save().then((result) => {
    res.status(201).json(result);
  });
});

module.exports = blogsRouter;
