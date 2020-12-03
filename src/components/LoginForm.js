import React from "react";

function LoginForm(props) {
  
  return (
    <form>
      <div>
        <label>
          Username
          <input id="username" name="username" type="text" />
        </label>
      </div>
      <div>
        <label>
          Password
          <input id="password" name="password" type="password" />
        </label>
      </div>
      <div>
        <button type="submit">Log in</button>
      </div>
    </form>
  );
}

export default LoginForm;
