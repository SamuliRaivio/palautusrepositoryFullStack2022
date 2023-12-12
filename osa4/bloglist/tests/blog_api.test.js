const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

//testejä suorittaessa sovellus käyttää eri tietokantaa kun sovelluksen dev ja production moodi
//testejä suorittaessa tyhjennetään tietokanta ja lisätään kaksi blogia
const initialBlogs = [
  {
    title: "test title 1",
    author: "test author 1",
    url: "www.testUrl1.com",
    likes: 10,
  },
  {
    title: "test title 2",
    author: "test author 2",
    url: "www.testUrl2.com",
    likes: 20,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("blogs are returned correctly", async () => {
  const res = await api.get("/api/blogs");

  expect(res.body).toHaveLength(initialBlogs.length);
});

test("specifig blog can by found correclty", async () => {
  const res = await api.get("/api/blogs");

  const titles = res.body.map((blog) => blog.title);

  expect(titles).toContain("test title 1");
});

test("blog indetification is id", async () => {
  const res = await api.get("/api/blogs");
  console.log(res.body[0].id);

  expect(res.body[0].id).toBeDefined();
});

test("new blog can be added", async () => {
  const newBlogData = {
    title: "test title 3",
    author: "test author 3",
    url: "www.testUrl3.com",
    likes: 30,
  };

  await api.post(
    "/api/blogs",
    {
      title: "test title 3",
      author: "test author 3",
      url: "www.testUrl3.com",
      likes: 30,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  const res = await api.get("/api/blogs");

  expect(res.body).toHaveLength(initialBlogs.length + 1);
});

afterAll(async () => {
  await mongoose.connection.close();
});
