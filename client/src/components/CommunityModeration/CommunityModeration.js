import React from "react";
import UsersBar from "../UsersBar/UsersBar";
import Middlebar from "../Middlebar/Middlebar";
import AboutModeration from "../AboutModeration/AboutModeration";
import NavigationBar from "../NavBar/NavBar";
import "./CommunityModeration.css";
import { Nav, Col, Button, NavDropdown, Dropdown } from "react-bootstrap";

function CommunityModeration() {
  return (
    <div className="moderation-bg-main">
      <div className="reddit-body moderation-bg">
        <NavigationBar></NavigationBar>

        <div className="container">
          <div className="row">
            <div className="col-md-12 moderation-bg">
              <Middlebar></Middlebar>
            </div>
            <hr />
            <div className="col-md-3 moderation-bg">
              {/* <UsersBar></UsersBar>              */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityModeration;
