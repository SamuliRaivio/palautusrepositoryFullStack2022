const bcrypt = require("bcrypt");
const Blog = require("../models/blog");
const User = require("../models/user");

//apufunktioita testeille
const initialBlogs = [
  {
    title: "test title 1",
    url: "www.testUrl1.com",
    likes: 10,
  },
  {
    title: "test title 2",
    url: "www.testUrl2.com",
    likes: 20,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
};
