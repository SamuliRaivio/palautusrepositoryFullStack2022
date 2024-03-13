import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LogInForm";
import BlogForm from "./components/BlogForm";
import "./App.css";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs, likeBlog } from "./reducers/blogReducer";
import { setUser, userLogin } from "./reducers/loginReducer";

const App = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const blogss = useSelector((state) => state.blogs);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [user, setUser] = useState(null);
  const user = useSelector((state) => state.login);

  console.log(user);

  //Haetaan kaikki blogit
  /* useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []); */

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  //Tarkistetaan onko käyttäjä ja tokeni tallennettu local storageen
  //-> vältetään uudelleen kirjautuminen sivun päivittämisen yhteydessä
  /* useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []); */

  const blogFormRef = useRef();

  const sortedBlogsByLikes = blogs.sort((a, b) => b.likes - a.likes);

  //Kirjautumisformin eventhandler
  //mikäli kirjautuminen onnistuu, tallennetaan käyttäjä local storageen ja päästetään käyttäjä sisään
  //mikäli ei tulostetaan sivulle ilmoitus
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      /* const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword(""); */

      dispatch(userLogin(username, password));
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("asd");
      dispatch(setNotification("error", "Wrong username or password"));
    }
  };

  //logout buttonin eventhandler
  //poistetaan käyttäjä local storagesta ja muutetaan käyttäjäarvo = null
  const handleLogOutClick = () => {
    dispatch(setUser(null));
    window.localStorage.removeItem("loggedUser");
  };

  //mikäli user arvo = null, sivulle tulostetaan vain login form
  if (!user) {
    return (
      <div>
        <div>
          <Notification />
        </div>
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
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
          <Notification />
        </div>
        <div>
          <BlogForm user={user} />
        </div>
      </div>
      <h3>BLOGS</h3>
      {blogss.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  );
};

export default App;
