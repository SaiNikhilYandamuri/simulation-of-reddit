import React from "react";
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable */
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import "./UsersBar.css";
import { ListGroup, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
const queryString = require("query-string");
import { Col, FormGroup, Label, FormControl } from "reactstrap";
import Axios from "axios";
import endPointObj from "../../endPointUrl";
import post from "../resources/post.png";
import { Input } from "reactstrap";
function UsersBar(props) {
  const [sort, setSortstring] = useState("Created at");
  const [searchcommunity, setsearchcommunity] = useState([]);
  const [community, setcommunity] = useState([]);
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [onChangeTriggered, setOnChangeTriggerd] = useState(false);
  const [displayList, setDisplayList] = useState([]);
  const [users, setUsers] = useState([]);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (email) => {
    Axios.post(
        endPointObj.url + "api/getUserCommunities",
        {
          email,
        },
        {
          headers: {
            Authorization: "jwt " + sessionStorage.getItem("token"),
          },
        }
      )
        .then((response) => {
          response.data.sort((a, b) => {
            // console.log(a.timestamp, b.timestamp);
            // console.log(a.timestamp < b.timestamp);
            return a.timestamp < b.timestamp ? 1 : -1;
          });
          console.log(response.data);
          setcommunity(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    //api call to fetch all the communities of the user selected
    setShow(true);
  };
  const getUsers = () => {
    console.log(sort);
    Axios.post(
      endPointObj.url + "api/ListOfUserJoinedCommunityCreatedByUser",
      {
        senderEmail :"yjs@gmail.com"
      },
      {
        headers: {
          Authorization: "jwt " + sessionStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        console.log(response.data);
        setusers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getSearchCommunity = (searchString, sort) => {
    console.log(sort);
    Axios.post(
      endPointObj.url + "api/searchCommunity",
      {
        searchString,
        sort,
      },
      {
        headers: {
          Authorization: "jwt " + sessionStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        console.log(response.data);
        setsearchcommunity(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const onChange = (opt, list) => {
    if (opt == null || opt == "undefined") {
      opt = "";
    }

    setSearchString(opt.target.value);
    getSearchCommunity(opt.target.value, " ");
    setOnChangeTriggerd(true);

    let final_list = users.filter((li) => {
      return li.communityName.includes(opt.target.value);
    });
    setDisplayList(final_list);
  };
  //   const accept = (groupName, email) => {
  //     acceptInvite(groupName, email).then((result) => {
  //       getInvites(email).then((result) => {
  //         setInvites(result);
  //       });
  //     });
  //   };

  //   function getInvites(email) {
  //     return new Promise((resolve, reject) => {
  //       Axios.get(endPointObj.url + 'invites/' + email)
  //         .then((response) => {
  //           resolve(response.data);
  //         })
  //         .catch((e) => {
  //           console.log(e);
  //         });
  //     });
  //   }

  //   function acceptInvite(groupName, email) {
  //     return new Promise((resolve, reject) => {
  //       Axios.post(endPointObj.url + 'inviteStatus', {
  //         status: true,
  //         groupName: groupName,
  //         email: email,
  //       })
  //         .then((response) => {
  //           resolve(response.data);
  //         })
  //         .catch((e) => {
  //           console.log(e);
  //         });
  //     });
  //   }

  useEffect(() => {
    getUsers();
  }, []);
  function deletecommuniy(groupName, email) {
    //     return new Promise((resolve, reject) => {
    //       Axios.post(endPointObj.url + 'inviteStatus', {
    //         status: true,
    //         groupName: groupName,
    //         email: email,
    //       })
    //         .then((response) => {
    //           resolve(response.data);
    //         })
    //         .catch((e) => {
    //           console.log(e);
    //         });
    //     });
  }

  return (
    <div>
      {" "}
      <Input
        type="text"
        placeholder="Search Community Name"
        onChange={(opt) => onChange(opt, community)}
        pattern="^[a-zA-Z]+([ ]{1}[a-zA-Z]+)*$"
        title="It can only contain letters, single space character. It must start with letter and cannot end with special character"
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId="exampleForm.ControlSelect1">
            {/* <option selected disabled hidden>
                  Choose here
                </option> */}

            {community.map((a) => (
              // <option key={a.name} value={a.name}>
              //   {a.communityName}
              // </option>
            
           
              <Button variant="secondary" onClick={deletecommuniy(a.communityName)}>
                Delete
              </Button>
           
            
            ))}
          </FormGroup>
        </Modal.Body>
      </Modal>
      <div className="App__content">
        <div class="info">
          {onChangeTriggered == true &&
            displayList.map((com) => (
              <div>
                <span>
                  <img src={post} height="55" width="55" class="thumbnail" />
                </span>

                <span>
                  <Link
                    data-testid="Group"
                    key={com.communityName}
                    onClick={() => {
                      handleShow(com.email);
                    }}
                    className="links-dashboard-groups"
                  >
                    {com.email}
                  </Link>
                </span>
              </div>
            ))}

          {onChangeTriggered == false &&
            users.map((com) => (
              <div>
                <span>
                  <img src={post} height="55" width="55" class="thumbnail" />
                </span>

                <span>
                  <Link
                    data-testid="Group"
                    key={com.communityName}
                    onClick={() => {
                      handleShow(com.email);
                    }}
                    className="links-dashboard-groups"
                  >
                    {com.email}
                  </Link>
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default UsersBar;
