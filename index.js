const React = require('react');
const ReactDOM = require('react-dom');

const LoginForm = require('./components/LoginForm');
const TwitterMessage = require('./components/TwitterMessage');
const PoemWriter = require('./components/PoemWriter');

function login({ username, password }) {
  console.log(`Logging in ${username} with password ${password}`);
}

ReactDOM.render(
  <div>
    <h1><pre>TwitterMessage</pre></h1>
    <TwitterMessage maxChars={140} />

    <h1><pre>LoginForm</pre></h1>
    <LoginForm onSubmit={login} />

    <h1><pre>PoemWriter</pre></h1>
    <PoemWriter />
  </div>,
  document.getElementById('main')
);

require('./test/index-test.js'); // Leave this in!
