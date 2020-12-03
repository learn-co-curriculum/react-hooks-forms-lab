import React from 'react'
import LoginForm from "./components/LoginForm";
import TwitterMessage from "./components/TwitterMessage";

function App() {

  function login({ username, password }) {
    console.log(`Logging in ${username} with password ${password}`);
  };

  return (
    <div>
      <h1>
        <pre>LoginForm</pre>
      </h1>
      <LoginForm handleLogin={login} />

      <h1>
        <pre>TwitterMessage</pre>
      </h1>
      <TwitterMessage maxChars={280} />

    </div>
  )
}

export default App
