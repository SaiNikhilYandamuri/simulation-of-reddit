import React, { useState, useEffect } from "react";
import Axios from "axios";
import queryString from "query-string";
import io from "socket.io-client";
import Messages from "../Messages_new/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import endPointObj from "../../endPointUrl";
import NavBar from "../NavBar/NavBar";
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
  const [user1, setUser] = useState("");
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

    Axios.post(
      endPointObj.url + "api/getMessages",
      {
        name,
        user,
      },
      {
        headers: {
          Authorization: "jwt " + sessionStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        console.log(response.data.result);
        const resultNew = response.data.result;
        const result1 = resultNew.map((res) => {
          let temp = res.user;
          res.user = res.name;
          res.name = temp;
          return res;
        });
        console.log(result1);
        setMessages(response.data.result);
        // resolve(response);
      })
      .catch((err) => {
        console.error("an error occured");
        if (err.response && err.response.data) {
          // setAlertMessage(err.response.data);
        }
      });

    return () => {
      socket.emit("disconnection");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
      setMessages((messages) => [...messages, message]);
      console.log(messages);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    // user = [name, (name = user)][0];

    if (message) {
      socket.emit("sendMessage", { message, name, user1 }, () =>
        setMessage("")
      );
    }
  };

  console.log(message, messages);

  return (
    <div>
      <NavBar />
      <div className="outerContainer">
        <div className="container">
          <InfoBar room={user1} />
          <Messages messages={messages} name={name} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
