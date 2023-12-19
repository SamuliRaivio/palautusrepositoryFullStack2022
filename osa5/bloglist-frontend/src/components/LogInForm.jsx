const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}) => (
  <div>
    <h2>Log in</h2>
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          ></input>
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          ></input>
        </div>

        <button type="submit"> log in</button>
      </form>
    </div>
  </div>
);

export default LoginForm;
