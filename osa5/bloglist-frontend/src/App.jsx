import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LogInForm";
import BlogForm from "./components/BlogForm";
import "./App.css";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [notificationStyle, setNotificationStyle] = useState();

  //Haetaan kaikki blogit
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  //Tarkistetaan onko käyttäjä ja tokeni tallennettu local storageen
  //-> vältetään uudelleen kirjautuminen sivun päivittämisen yhteydessä
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();

  const sortedBlogsByLikes = blogs.sort((a, b) => b.likes - a.likes);

  //Kirjautumisformin eventhandler
  //mikäli kirjautuminen onnistuu, tallennetaan käyttäjä local storageen ja päästetään käyttäjä sisään
  //mikäli ei tulostetaan sivulle ilmoitus
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotification("Wrong username or password");
      setNotificationStyle("notificationDeleted");
    }
    setTimeout(() => {
      setNotification(null);
      setNotificationStyle("");
    }, 3000);
  };

  //logout buttonin eventhandler
  //poistetaan käyttäjä local storagesta ja muutetaan käyttäjäarvo = null
  const handleLogOutClick = () => {
    setUser(null);
    window.localStorage.removeItem("loggedUser");
  };

  //blogiformin eventhandler
  //lisätään blogi ja tulostetaan ilmoitus onnistuneesta ja epäonnistuneesta lisäyksestä
  const addBlog = async (blogObject) => {
    blogFormRef.current.changeVisibility();
    try {
      const newBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(newBlog));
      setNotification(`${blogObject.title} by ${blogObject.author} added`);
      setNotificationStyle("notificationAdd");
    } catch (error) {
      console.log(error);
      setNotification(error.response.data.error);
      setNotificationStyle("notificationDeleted");
    }

    setTimeout(() => {
      setNotification(null);
      setNotificationStyle("");
    }, 3000);
  };

  const addLikeToBlog = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject);
      setBlogs(
        blogs.map((blog) => {
          if (blog.id === updatedBlog.id) {
            return { ...blog, likes: blog.likes + 1 };
          }
          return blog;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  //mikäli user arvo = null, sivulle tulostetaan vain login form
  if (!user) {
    return (
      <div>
        <div>
          <Notification
            notification={notification}
            notificationStyle={notificationStyle}
          />
        </div>
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    );
  }

  //muuten eli, user != null, tulostetaan sivulle blogit ja blogform
  return (
    <div>
      <div>
        <p style={{ display: "inline" }}>
          {user.firstname} {user.lastname} logged in
        </p>
        <button onClick={handleLogOutClick}>logout</button>
      </div>
      <div>
        <h3>CREATE NEW BLOG</h3>
        <div>
          <Notification
            notification={notification}
            notificationStyle={notificationStyle}
          />
        </div>
        <div>
          <Togglable buttonLabel="newBlog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} user={user} />
          </Togglable>
        </div>
      </div>
      <h3>BLOGS</h3>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={addLikeToBlog}
          blogToRemove={removeBlog}
          user={user}
        />
      ))}
    </div>
  );
};

export default App;
