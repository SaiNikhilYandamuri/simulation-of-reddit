import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./StartChat.css";

const StartChat = () => {
  const [name, setName] = useState("");
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Start Chat</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <Link
          onClick={(e) => (!name ? e.preventDefault() : null)}
          to={`/chat?name=${name}`}
        >
          <button className={"button mt-20"} type="submit">
            Start Chat
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StartChat;
