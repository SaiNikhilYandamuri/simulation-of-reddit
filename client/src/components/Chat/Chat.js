import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import Messages from "../Messages_new/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import "./Chat.css";

//import TextContainer from "../TextContainer/TextContainer";
//import Messages from "../Messages/Messages";
//import InfoBar from "../InfoBar/InfoBar";
//import Input from "../Input/Input";

// import "./Chat.css";

const ENDPOINT = "http://localhost:3001";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  // const user = "Nikhil";
  const [user, setUser] = useState("");
  useEffect(() => {
    const { name, user } = queryString.parse(location.search);

    socket = io(ENDPOINT, {
      transports: ["websocket"],
      rejectUnauthorized: false,
    });

    // setRoom(room);
    setName(name);
    setUser(user);
    // user = [name, (name = user)][0];
    socket.emit("start", { name, user }, () => {});

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    // user = [name, (name = user)][0];

    if (message) {
      socket.emit("sendMessage", { message, name, user }, () => setMessage(""));
    }
  };

  console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={user} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
