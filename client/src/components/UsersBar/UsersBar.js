import React from "react";
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable */

import { useEffect, useState } from 'react';
import './UsersBar.css';
import { ListGroup, Button, Nav } from 'react-bootstrap';
const queryString = require('query-string');
import Axios from 'axios';
import endPointObj from '../../endPointUrl';
import post from "../resources/post.png";
function UsersBar(props) {
    const [community, setcommunity] = useState([]);
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (email) => {
    Axios.post(
        endPointObj.url + "api/getCommunity",
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
      {' '}
     {/* {props.members.map((member) => */} 
     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Communities joined</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label data-testid="dashboard">Pay</Form.Label>
              <Form.Control as="select" onChange={getAmountforOwe}>
                <option selected disabled hidden>
                  Choose here
                </option>
                {community.map((a) => (
                  <option key={a.name} value={a.name}>
                    {a.communityName}
                  </option>
                 ))}
                <button variant="secondary" onClick={deletecommuniy}>
            Delete
          </button>
         
          
              </Form.Control>
            </Form.Group>
            </Form>
          </Modal.Body>
      </Modal>
          
          
          
          
          
          <div class="info">
           
          <div>
            
          <span>
          <img src={post} height="55" width="55" class="thumbnail" />
          </span>
            <span>
              <Nav.Link
                data-testid="Group"
                key={members.email}
                onClick={() => {handleShow(members.email)}}
                className="links-dashboard-groups"
              >
                {com.communityName}
              </Nav.Link>
            </span>
          </div>
          
        </div>
        )}
    </div>
  );
}

UsersBar.defaultProps = {
  members: [],
  Dashboard: false,
};

export default UsersBar;
