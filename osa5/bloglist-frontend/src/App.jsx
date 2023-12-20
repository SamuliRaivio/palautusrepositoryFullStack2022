import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LogInForm";
import BlogForm from "./components/BlogForm";
import "./App.css";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
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
  const addBlog = async (event) => {
    event.preventDefault();

    try {
      const blogToAdd = { title: title, url: url, userId: user.id };
      const newBlog = await blogService.create(blogToAdd);
      setBlogs(blogs.concat(newBlog));
      setNotification(`${title} by ${user.firstname} ${user.lastname} added`);
      setNotificationStyle("notificationAdd");
    } catch (error) {
      setNotification(error.message);
      setNotificationStyle("notificationDeleted");
    }

    setTimeout(() => {
      setNotification(null);
      setNotificationStyle("");
    }, 3000);
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
        <button onClick={handleLogOutClick}>logout</button>
      </div>
      <div>
        <Notification
          notification={notification}
          notificationStyle={notificationStyle}
        />
      </div>
      <div>
        <BlogForm
          title={title}
          setTitle={setTitle}
          url={url}
          setUrl={setUrl}
          addBlog={addBlog}
        />
      </div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
