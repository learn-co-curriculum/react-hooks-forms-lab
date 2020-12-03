import React, { useState } from "react";

function LoginForm({ handleLogin }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handleUsernameChange(event) {
    setUsername(event.target.value)
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (username.length > 0 && password.length > 0) {
      handleLogin({ 
        username: username,
        password: password
      })
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username
          <input 
            id="username" 
            name="username" 
            type="text" 
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
      </div>
      <div>
        <label>
          Password
          <input 
            id="password" 
            name="password" 
            type="password" 
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
      </div>
      <div>
        <button type="submit">Log in</button>
      </div>
    </form>
  );
}

export default LoginForm;
