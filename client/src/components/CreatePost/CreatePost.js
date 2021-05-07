import React, { useEffect, useState } from "react";
import "./CreatePost.css";
import { Editor } from "@tinymce/tinymce-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBar from "../NavBar/NavBar";
import Rules from "../Rules/Rules";

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
} from "react-bootstrap";
import { faLink, faFile, faImage } from "@fortawesome/free-solid-svg-icons";

function CreatePost() {
  const [type, setType] = useState("text");

  if (type === "url") {
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="row">
            <hr />
            <div className="create-post-container col-md-9">
              <form className="post-form">
                <div className="form-group">
                  <div className="create-post-heading">Create a Post</div>
                  <hr />
                  <select
                    className="form-control"
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                  >
                    <option value="" selected disabled>
                      Select Community
                    </option>
                    <option>Community 1</option>
                  </select>
                  <hr />
                  <ButtonGroup
                    className="form-control"
                    //className="mb-2"
                    style={{
                      padding: "0px 0px",
                      flex: 1,
                      border: "1px solid #0079d3",
                    }}
                  >
                    <Button
                      variant="outline-primary"
                      className="form-control"
                      onClick={() => {
                        setType("text");
                      }}
                    >
                      <FontAwesomeIcon className="icon" icon={faFile} />
                      Post
                    </Button>
                    <Button
                      variant="outline-primary"
                      className="form-control"
                      onClick={() => {
                        setType("image");
                      }}
                    >
                      <FontAwesomeIcon className="icon" icon={faImage} />
                      Images
                    </Button>
                    <Button
                      variant="outline-primary"
                      className="form-control"
                      onClick={() => {
                        setType("url");
                      }}
                    >
                      <FontAwesomeIcon className="icon" icon={faLink} />
                      Links
                    </Button>
                  </ButtonGroup>
                  <hr />
                  <input
                    type="text"
                    className="form-control"
                    style={{ marginTop: "5px" }}
                    placeholder="Title"
                  ></input>

                  <input
                    type="text"
                    className="form-control"
                    style={{ marginTop: "5px" }}
                    placeholder="URL"
                  ></input>

                  <span>
                    <div style={{ marginTop: "5px" }} className="float-right">
                      <button className="btnDiscard">Discard</button>
                      <button className="btnCreatePost">Post</button>
                    </div>
                  </span>
                </div>
              </form>
            </div>
            <div className="col-md-3">
              <Rules />
            </div>
          </div>
        </div>
      </div>
    );
  } else if (type === "text") {
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="row">
            <hr />
            <div className="create-post-container col-md-9">
              <form className="post-form">
                <div className="form-group">
                  <div className="create-post-heading">Create a Post</div>
                  <hr />
                  <select
                    className="form-control"
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                  >
                    <option value="" selected disabled>
                      Select Community
                    </option>
                    <option>Community 1</option>
                  </select>
                  <hr />
                  <ButtonGroup
                    className="form-control"
                    //className="mb-2"
                    style={{
                      padding: "0px 0px",
                      flex: 1,
                      border: "1px solid #0079d3",
                    }}
                  >
                    <Button
                      variant="outline-primary"
                      className="form-control"
                      onClick={(e) => {
                        setType("text");
                      }}
                    >
                      <FontAwesomeIcon className="icon" icon={faFile} />
                      Post
                    </Button>
                    <Button
                      variant="outline-primary"
                      className="form-control"
                      onClick={(e) => {
                        setType("image");
                      }}
                    >
                      <FontAwesomeIcon className="icon" icon={faImage} />
                      Images
                    </Button>
                    <Button
                      variant="outline-primary"
                      className="form-control"
                      onClick={(e) => {
                        setType("url");
                      }}
                    >
                      <FontAwesomeIcon className="icon" icon={faLink} />
                      Links
                    </Button>
                  </ButtonGroup>
                  <hr />
                  <input
                    type="text"
                    className="form-control"
                    style={{ marginTop: "5px", marginBottom: "5px" }}
                    placeholder="Title"
                  ></input>

                  <Editor
                    init={{
                      height: 300,
                      menubar: false,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                      ],
                      toolbar:
                        "undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help",
                    }}
                  ></Editor>
                  <span>
                    <div style={{ marginTop: "5px" }} className="float-right">
                      <button className="btnDiscard">Discard</button>
                      <button className="btnCreatePost">Post</button>
                    </div>
                  </span>
                </div>
              </form>
            </div>
            <div className="col-md-3">
              <Rules />
            </div>
          </div>
        </div>
      </div>
    );
  } else if (type === "image") {
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="row">
            <hr />
            <div className="create-post-container col-md-9">
              <form className="post-form">
                <div className="form-group">
                  <div className="create-post-heading">Create a Post</div>
                  <hr />
                  <select
                    className="form-control"
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                  >
                    <option value="" selected disabled>
                      Select Community
                    </option>
                    <option>Community 1</option>
                  </select>
                  <hr />
                  <ButtonGroup
                    className="form-control"
                    //className="mb-2"
                    style={{
                      padding: "0px 0px",
                      flex: 1,
                      border: "1px solid #0079d3",
                    }}
                  >
                    <Button
                      variant="outline-primary"
                      className="form-control"
                      onClick={(e) => {
                        setType("text");
                      }}
                    >
                      <FontAwesomeIcon className="icon" icon={faFile} />
                      Post
                    </Button>
                    <Button
                      variant="outline-primary"
                      className="form-control"
                      onClick={(e) => {
                        setType("image");
                      }}
                    >
                      <FontAwesomeIcon className="icon" icon={faImage} />
                      Images
                    </Button>
                    <Button
                      variant="outline-primary"
                      className="form-control"
                      onClick={(e) => {
                        setType("url");
                      }}
                    >
                      <FontAwesomeIcon className="icon" icon={faLink} />
                      Links
                    </Button>
                  </ButtonGroup>
                  <hr />
                  <input
                    type="text"
                    className="form-control"
                    style={{ marginTop: "5px" }}
                    placeholder="Title"
                  ></input>

                  <div
                    className="from-control"
                    style={{
                      border: "1px solid #ccc",

                      marginTop: "5px",
                      marginBottom: "5px",
                      overflow: "hidden",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      color: "#878a8c",
                      position: "relative",
                      borderRadius: "4px",
                      padding: "5px",
                      flex: 1,
                    }}
                  >
                    <input
                      type="file"
                      id="file"
                      accept=".png, .jpg, .jpeg"
                      //   onChange={(e) => {
                      //     setDefault(e);
                      // }}
                    ></input>
                    <button className="rounded-pill">Upload</button>
                  </div>
                  <div className="center">
                    {/* {console.log(this.state.selectedFile)} */}

                    <img
                      src="https://lh3.googleusercontent.com/proxy/Ryod8CP4z39mkocZ4CVNrR7LsPu9BEEGe0NGdICmNNXw7eTyS8Afj2_8XxKXZ-zB9RnkYLBYFLg7El1ceXpJKeJpgS7afNXX7pk2m1Sf7S3WvPYf5dw33hmsEi2H4ZdEotf9AS3gLu5U"
                      alt=""
                      id="img"
                      className="img"
                    />
                  </div>

                  <span>
                    <div style={{ marginTop: "5px" }} className="float-right">
                      <button className="btnDiscard">Discard</button>
                      <button
                        className="btnCreatePost"
                        onClick={(e) => {
                          console.log("refresh hua");
                        }}
                      >
                        Post
                      </button>
                    </div>
                  </span>
                </div>
              </form>
            </div>
            <div className="col-md-3">
              <Rules />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePost;
