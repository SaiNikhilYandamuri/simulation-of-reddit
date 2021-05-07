import React from "react";
import SideBar from "../SideBar/SideBar";
import PostTile from "../PostTile/PostTile";
import SubRedditSideBar from "../SubRedditSideBar/SubRedditSideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./HomePage.css";
import {
  faChartLine,
  faComments,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  ButtonGroup,
  Grid,
  Row,
  Col,
  ListGroup,
  Form,
  Card,
  Modal,
  Alert,
  Dropdown,
} from "react-bootstrap";
function HomePage() {
  return (
    <div>
      <div className="reddit-body">
        <div className="container">
          <div className="row">
            <hr />
            {/* <div className="col-md-9">
              
              <PostTile />
            </div> */}
            <div className="col-md-9">
              <div className="input-group">
                <Dropdown
                  style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                    marginRight: "5px",
                  }}
                >
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Filter By ...
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <FontAwesomeIcon className="icon" icon={faChartLine} />
                      &nbsp; Most Upvoted
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <FontAwesomeIcon className="icon" icon={faUser} />
                      &nbsp;Most Users
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <FontAwesomeIcon className="icon" icon={faComments} />
                      &nbsp;Most Comments
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for..."
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                />

                <span class="input-group-btn">
                  <button className="search">
                    <FontAwesomeIcon className="sicon" icon={faSearch} />
                  </button>
                </span>
              </div>
              <PostTile />
            </div>
            <div className="col-md-3">
              <SideBar></SideBar>
              <SubRedditSideBar></SubRedditSideBar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
