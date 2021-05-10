import React from "react";
import './styling.css';

function MessageList(props) {
  return (
    <div>
      <ul className="message-list">
        {props.messages.map((message, index) => {
          return (
            <li key={message.id} className="message">
              <div>{message.senderId}</div>
              <div>{message.text}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MessageList;
