import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Axios from "axios";
import endPointObj from "../../endPointUrl";
import { useLocation, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import NavBar from "../NavBar/NavBar";
import Button from "react-bootstrap/Button";

const queryString = require("query-string");

export default function InvitationPage() {
  const [invitations, setInvitations] = useState([]);
  const name = useSelector((state) => state.login.username);
  const getInvitationsOfUser = () => {
    return new Promise((resolve, reject) => {
      Axios.post(
        endPointObj.url + "api/getInvitations",
        {
          email: name,
        },
        {
          headers: {
            Authorization: "jwt " + sessionStorage.getItem("token"),
          },
        }
      )
        .then((response) => {
          console.log(response.data);
          setInvitations(response.data);
          // resolve(response);
        })
        .catch((err) => {
          console.error("an error occured");
          if (err.response && err.response.data) {
            // setAlertMessage(err.response.data);
          }
        });
    });
  };
  const acceptInvitation = (communityName) => {
    Axios.post(
      endPointObj.url + "api/acceptInvitationByUser",
      { email: name, communityName: communityName },
      {
        headers: {
          Authorization: "jwt " + sessionStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        getInvitationsOfUser();
      })
      .catch((err) => {
        console.error("an error occured");
        if (err.response && err.response.data) {
          // setAlertMessage(err.response.data);
        }
      });
  };
  useEffect(() => {
    getInvitationsOfUser();
    console.log(invitations);
  }, []);
  return (
    <div className="invite-page">
      <NavBar />
      <center>
        <h3>Invitations</h3>
      </center>
      <ListGroup>
        {invitations.map((ele) => (
          <div>
            <ListGroup.Item>
              {ele}{" "}
              <Button
                variant="primary"
                value={ele}
                onClick={(e) => acceptInvitation(e.currentTarget.value)}
              >
                Accept
              </Button>
            </ListGroup.Item>
          </div>
        ))}
      </ListGroup>
    </div>
  );
}
