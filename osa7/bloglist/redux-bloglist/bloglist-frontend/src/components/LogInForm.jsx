import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, userLogin } from "../reducers/loginReducer";
import { setNotification } from "../reducers/notificationReducer";
import blogService from "../services/blogs";

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      dispatch(userLogin(username, password));
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("asd");
      dispatch(setNotification("error", "Wrong username or password"));
    }
  };

  return (
    <div>
      <h2>Log in</h2>
      <div>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            ></input>
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            ></input>
          </div>

          <button id="login-button" type="submit">
            log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
