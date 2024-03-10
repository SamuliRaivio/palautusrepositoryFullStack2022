//Blogs sisältää reittien määrittelyt "kontrollerit"
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//Haetaan kaikki blogi-oliot tietokannasta
blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", {
    firstname: 1,
    lastname: 1,
  });
  res.json(blogs);
});

//luodaan uusi blogi-olio tietokantaan
//jos blogin tykkäyksille (likes) ei ole annettu arvoa, annetaan sille arvoksi 0
blogsRouter.post("/", async (req, res) => {
  const body = req.body;
  let blog = {};

  const decodedToken = jwt.verify(req.body.token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" });
  }

  const user = req.body.user;

  if (body.userId) {
    blog = new Blog({
      title: body.title,
      author: body.author,
      user: user._id,
      url: body.url,
      likes: body.likes,
    });
  }

  if (!blog.likes) {
    blog.likes = 0;
  }

  const savedBlog = await blog.save();
  await savedBlog.populate("user", { firstname: 1, lastname: 1 });
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  res.status(201).json(savedBlog);
});

//blogin poisto
blogsRouter.delete("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  const decodedToken = jwt.verify(req.body.token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" });
  }
  const userloggenIn = req.body.user;
  const user = await User.findById(blog.user);

  if (user.id !== userloggenIn.id) {
    return res.status(401).json({ error: "invalid user" });
  }

  user.blogs = user.blogs.filter((blog) => blog.toString() !== req.params.id);
  await user.save();

  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

//blogin muokkaus
//note to myself: {new: true} on sitä varten että findByIdAndUpdate palauttaa päivitetyn blogin eikä vanhaa
blogsRouter.put("/:id", async (req, res) => {
  const blog = req.body;

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });
  res.status(200).json(updatedBlog);
});

module.exports = blogsRouter;
