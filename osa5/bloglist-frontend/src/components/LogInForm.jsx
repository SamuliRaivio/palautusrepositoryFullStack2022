const LoginForm = (props) => (
  <div>
    <h2>Log in</h2>
    <div>
      <form onSubmit={props.handleLogin}>
        <div>
          username
          <input
            type="text"
            value={props.username}
            name="Username"
            onChange={({ target }) => props.setUsername(target.value)}
          ></input>
        </div>
        <div>
          password
          <input
            type="text"
            value={props.password}
            name="Password"
            onChange={({ target }) => props.setPassword(target.value)}
          ></input>
        </div>

        <button type="submit"> log in</button>
      </form>
    </div>
  </div>
);

export default LoginForm;
