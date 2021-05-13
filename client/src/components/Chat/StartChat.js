import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./StartChat.css";
import endPointObj from "../../endPointUrl";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";

const StartChat = () => {
  const [users, setUsers] = useState([]);
  // const [name, setName] = useState("");
  const [user, setUser] = useState("");

  const name = useSelector((state) => state.login.username);

  const getUsers = (searchString) => {
    return new Promise((resolve, reject) => {
      Axios.post(
        endPointObj.url + "api/searchUser",
        {
          searchString,
        },
        {
          headers: {
            Authorization: "jwt " + sessionStorage.getItem("token"),
          },
        }
      )
        .then((response) => {
          resolve(response);
          // history.push({
          //   pathname: "/communityPage",
          // });
          // console.log("successfully create community");
        })
        .catch((err) => {
          console.error("an error occured");
          if (err.response && err.response.data) {
            // setAlertMessage(err.response.data);
          }
        });
    });
  };

  useEffect(() => {
    getUsers("").then((results) => {
      console.log(results);

      // let result = results.data.map((res) => {
      //   return res.email;
      // });

      console.log(results.data);

      setUsers(results.data);
    });
  }, []);

  const handleChangeNameFilter = (value) => {
    console.log(value);
    setUser(value.email);
  };

  const onFilterTextChange = (value) => {
    console.log(value);
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Start Chat</h1>
        <div>
          {/* <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
          /> */}

          <Autocomplete
            id="combo-box-demo"
            options={users}
            getOptionLabel={(option) => option.email}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Combo box" variant="outlined" />
            )}
            onChange={(event, newValue) => {
              handleChangeNameFilter(newValue);
            }}
            onInputChange={(event, newInputValue) => {
              onFilterTextChange(newInputValue);
            }}
          />
        </div>
        <div>
          {/* <input
            placeholder="User"
            className="joinInput"
            type="text"
            onChange={(event) => setUser(event.target.value)}
          /> */}
        </div>

        <Link
          onClick={(e) => (!name ? e.preventDefault() : null)}
          to={`/chat?name=${name}&user=${user}`}
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
