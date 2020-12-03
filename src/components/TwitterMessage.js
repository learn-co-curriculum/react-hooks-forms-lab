import React, { useState } from "react";

function TwitterMessage({ maxChars }) {
  const [message, setMessage] = useState("")

  function handleChange(event) {
    setMessage(event.target.value)
  }

  return (
    <div>
      <strong>Your message:</strong>
      <input 
        type="text" 
        name="message" 
        id="message" 
        value={message}
        onChange={handleChange}
      />
      <p>Characters Remaining: {maxChars - message.length}</p>
    </div>
  );
}

export default TwitterMessage;
