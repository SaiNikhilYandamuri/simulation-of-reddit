import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import PostTile from "../PostTile/PostTile";
import SubRedditSideBar from "../SubRedditSideBar/SubRedditSideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import endPointObj from "../../endPointUrl";
import { useDispatch, useSelector } from "react-redux";
import SearchComponent from "../SearchCommunity/SearchCommunity";
import "./HomePage.css";
import {
  faChartLine,
  faComments,
  faSearch,
  faUser,
  faCommentAlt,
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
const queryString = require("query-string");

function HomePage() {
  const history = useHistory();
  const location = useLocation();
  const email = useSelector((state) => state.login.username);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [posts, setPosts] = React.useState([]);

  let getPosts = () => {
    return new Promise((resolve, reject) => {
      Axios.post(
        endPointObj.url + "api/getPost",
        {
          communityName: "HTML Tricks",
        },
        {
          headers: {
            Authorization: "jwt " + sessionStorage.getItem("token"),
          },
        }
      )
        .then((response) => {
          console.log(response);

          setPosts(response.data[0]);
        })
        .catch((err) => {
          console.error("an error occured");
          if (err.response && err.response.data) {
          }
        });
    });
  };

  useEffect(() => {
    getPosts().then((result) => {
      console.log("fetched posts");
    });
  }, [location]);

  const redirectToMessages = () => {
    history.push({
      pathname: "/messages",
      //search: "?modalOpen=true&type=" + type,
    });
  };

  return (
    <div>
      <div className="reddit-body">
        <div className="container">
          <div className="row">
            <hr />
            <div className="col-md-9">
              {/* Remind about clash in csss !!!!!!!!!!!!!!!!!!!! */}
              
              {posts.map((post) => (
                <PostTile
                  postTitle={post.postTitle}
                  // text={post.text}
                  creationtime={post.creationTime}
                  createdByEmail={post.createdByEmail}
                  communityName={post.communityName}
                  numberOfUpvotes={post.numberOfUpvotes}
                ></PostTile>
              ))}
            </div>
            <div className="col-md-3">
              <SideBar></SideBar>
              {/* <SubRedditSideBar></SubRedditSideBar> */}
              {/* Remind about clash in csss !!!!!!!!!!!!!!!!!!!! */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
