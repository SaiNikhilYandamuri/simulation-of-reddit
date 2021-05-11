import React, { useEffect, useState } from "react";
import "./styling.css";

function SendMessageForm(props) {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // props.sendMessage(message);
    setMessage("");
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="send-message-form"
      >
        <input
          onChange={(e) => {
            handleChange(e);
          }}
          value={message}
          placeholder="Type your message and hit ENTER"
          type="text"
        />
      </form>
    </div>
  );
}

export default SendMessageForm;
