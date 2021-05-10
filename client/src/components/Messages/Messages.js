import React, { useEffect, useState } from "react";
import Title from "./Title";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";
import UserList from "./UserList";
import NavBar from "../NavBar/NavBar";
import "./styling.css";

function Messages() {
  const currentUser = "perborgen";
  const DUMMY_DATA = [
    {
      senderId: "perborgen",
      text: "who'll win?",
    },
    {
      senderId: "janedoe",
      text: "who'll win?",
    },
  ];
  const [messages, setMsgs] = useState(DUMMY_DATA);
  const roomId = 9806194;
  const sendMessage = (text) => {
    currentUser.sendMessage({
      text,
      roomId: roomId,
    });
  };

  return (
    <div>
      <div className="app">
        <NavBar />
        <Title />
        <div className="row">
          <div className="col-md-3">
            <UserList />
          </div>
          <div className="col-md-9">
            <MessageList messages={messages} />
            <SendMessageForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
