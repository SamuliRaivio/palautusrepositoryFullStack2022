const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");
const User = require("../models/user");

describe("When database has some blogs initially", () => {
  //testejä suorittaessa sovellus käyttää eri tietokantaa kun sovelluksen dev ja production moodi
  //testejä suorittaessa tyhjennetään tietokanta ja lisätään kaksi blogia helper apufunktioista
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("blogs are returned correctly", async () => {
    const res = await api.get("/api/blogs");

    expect(res.body).toHaveLength(helper.initialBlogs.length);
  });

  test("specifig blog can by found correclty", async () => {
    const res = await api.get("/api/blogs");

    const titles = res.body.map((blog) => blog.title);

    expect(titles).toContain("test title 1");
  });

  describe("testing spesific blog from database", () => {
    test("blog indetification is id", async () => {
      const res = await api.get("/api/blogs");

      expect(res.body[0].id).toBeDefined();
    });
  });

  describe("testing adding new blogs", () => {
    test("new blog can be added", async () => {
      const newBlog = {
        title: "test title 3",
        url: "www.testUrl3.com",
        likes: 30,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Content-Type", "application/json");

      const res = await api.get("/api/blogs");

      expect(res.body[res.body.length - 1].title).toEqual(newBlog.title);
    });
    test("blog's likes without given value is set to 0", async () => {
      const newBlog = {
        title: "test title 4",
        url: "www.testUrl4.com",
        likes: "",
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Content-Type", "application/json");

      const res = await api.get("/api/blogs");

      expect(res.body[res.body.length - 1].likes).toBe(0);
    });
    test("trying to add new blog without title or url gives status 400", async () => {
      const newBlogs = [
        {
          title: "",
          url: "www.testUrl5.com",
          likes: 50,
        },
        {
          title: "test title 6",
          url: "",
          likes: 60,
        },
        {
          title: "",
          url: "",
          likes: 70,
        },
      ];

      const res1 = await api
        .post("/api/blogs")
        .send(newBlogs[0])
        .set("Content-Type", "application/json");

      const res2 = await api
        .post("/api/blogs")
        .send(newBlogs[1])
        .set("Content-Type", "application/json");

      const res3 = await api
        .post("/api/blogs")
        .send(newBlogs[2])
        .set("Content-Type", "application/json");

      expect(res1.status).toBe(400);
      expect(res2.status).toBe(400);
      expect(res3.status).toBe(400);
    });
  });

  describe("testing deleting blogs", () => {
    test("blog can be deleted", async () => {
      const blogsBefore = await api.get("/api/blogs");
      const blogToDelete = blogsBefore.body[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      const blogsAfter = await api.get("/api/blogs");

      expect(blogsAfter.body.length).toBe(blogsBefore.body.length - 1);
    });

    test("deleting blog also deletes it from user", async () => {
      await User.deleteMany({});

      const passwordHash = await bcrypt.hash("secterPassword", 10);
      const user = new User({
        username: "testUsernameToDeleteBlog",
        firstname: "TestFirstName",
        lastname: "TestLastName",
        passwordHash,
      });

      await user.save();

      const newBlogToDelete = {
        title: "test title 1",
        userId: user._id.toString(),
        url: "www.testUrl1.com",
        likes: 10,
      };

      await api
        .post("/api/blogs")
        .send(newBlogToDelete)
        .set("Content-Type", "application/json")
        .expect(201);

      const blogsAfter = await api.get("/api/blogs");

      expect(blogsAfter.body.length).toBe(helper.initialBlogs.length + 1);

      const users = await api.get("/api/users");
      console.log(blogsAfter.body);
      console.log(users.body[0].blogs[0]);
      console.log(newBlogToDelete);
      const x = users.body[0].blogs[0];
      expect(users.body[0].blogs[0]).toBe(blogsAfter.body[2].id);
    });
  });

  describe("testing updating blogs", () => {
    test("blog can be updated", async () => {
      const newBlog = {
        title: "test title 1",
        url: "www.testUrl1.com",
        likes: 11,
      };

      const blogsBefore = await api.get("/api/blogs");
      const blogToUpdated = blogsBefore.body[0];

      await api
        .put(`/api/blogs/${blogToUpdated.id}`)
        .send(newBlog)
        .set("Content-Type", "application/json")
        .expect(200);

      const blogsAfter = await api.get("/api/blogs");

      expect(blogsAfter.body[0].likes).toBe(11);
    });
  });
});

describe("When database has one initial user", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secterPassword", 10);
    const user = new User({
      username: "testusername",
      firstname: "TestFirstName",
      lastname: "TestLastName",
      passwordHash,
    });

    await user.save();
  });

  test("creating new user", async () => {
    const usersBefore = await helper.usersInDb();

    const newUser = {
      username: "newtestusername",
      firstname: "NewTestFirstName2",
      lastname: "NewTestLastName2",
      password: "PasswordSecret",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAfter = await helper.usersInDb();
    expect(usersAfter).toHaveLength(usersBefore.length + 1);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
