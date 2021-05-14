import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./CreatePost.css";
import { Editor } from "@tinymce/tinymce-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBar from "../NavBar/NavBar";
import Rules from "../Rules/Rules";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import endPointObj from "../../endPointUrl";
// import { Alert } from "react-alert";
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

import tinyMCE from "react-tinymce";
const queryString = require("query-string");

function CreatePost() {
  const history = useHistory();
  const location = useLocation();
  const email = useSelector((state) => state.login.username);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [type, setType] = React.useState("text");
  const [communities, setCommunities] = React.useState([]);
  const [community_name, setName] = React.useState("");
  const [post_title, setTitle] = React.useState("");
  const [images, setImages] = React.useState();
  const [url, setURL] = React.useState("");
  const [text, setText] = React.useState("");
  const [images_url, setImgURL] = React.useState("");

  let getUserCommunities = () => {
    if (queryString.parse(location.search).communityname) {
      return new Promise((resolve, reject) => {
        setCommunities([`${queryString.parse(location.search).communityname}`]);
        setName(`${queryString.parse(location.search).communityname}`);
      });
    } else {
      return new Promise((resolve, reject) => {
        Axios.post(
          endPointObj.url + "api/getUserCommunities",
          {
            email: email,
          },
          {
            headers: {
              Authorization: "jwt " + sessionStorage.getItem("token"),
            },
          }
        )
          .then((response) => {
            console.log(response);

            setCommunities(response.data.communities);
            setName(response.data.communities[0]);
          })
          .catch((err) => {
            console.error("an error occured");
            if (err.response && err.response.data) {
              setAlertMessage(err.response.data);
            }
          });
      });
    }
  };

  useEffect(() => {
    getUserCommunities().then((result) => {
      console.log("fetched communities user belongs to");
    });
  }, [location]);

  let handlePost = () => {
    return new Promise((resolve, reject) => {
      Axios.post(
        endPointObj.url + "api/createPost",
        {
          createdByEmail: email,
          communityName: community_name,
          postTitle: post_title,
          flag: type,
          images: images,
          url: url,
          text: text,
        },
        {
          headers: {
            Authorization: "jwt " + sessionStorage.getItem("token"),
          },
        }
      )
        .then((response) => {
          console.log(response);
          setAlertMessage("Post Created Successfully");
          alert("Post created Successfully");

          setTitle("");
          setText("");
          setURL("");
          // tinyMCE.activeEditor.setContent("");
        })
        .catch((err) => {
          console.error("an error occured");
          if (err.response && err.response.data) {
            setAlertMessage(err.response.data);
          }
        });
    });
  };

  // if (type === "url") {
  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="row">
          <hr />
          <div className="create-post-container col-md-9">
            <div className="form-group">
              <div className="create-post-heading">Create a Post</div>
              <hr />
              <select
                value={community_name}
                className="form-control"
                style={{ marginTop: "10px", marginBottom: "10px" }}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              >
                <option selected disabled>
                  Select Community
                </option>
                {communities.map((comm) => (
                  <option>{comm}</option>
                ))}
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

              {(function () {
                if (type === "url") {
                  return (
                    <div>
                      <input
                        type="text"
                        value={post_title}
                        className="form-control"
                        style={{ marginTop: "5px" }}
                        placeholder="Title"
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                      ></input>
                      <input
                        type="url"
                        value={url}
                        className="form-control"
                        style={{ marginTop: "5px" }}
                        placeholder="URL"
                        onChange={(e) => {
                          setURL(e.target.value);
                        }}
                      ></input>
                    </div>
                  );
                } else if (type === "text") {
                  return (
                    <div>
                      <input
                        type="text"
                        value={post_title}
                        className="form-control"
                        style={{ marginTop: "5px" }}
                        placeholder="Title"
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
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
                        onChange={(e) => {
                          setText(e.target.getContent());
                        }}
                      ></Editor>
                    </div>
                  );
                } else if (type === "image") {
                  return (
                    <div>
                      <input
                        type="text"
                        value={post_title}
                        className="form-control"
                        style={{ marginTop: "5px" }}
                        placeholder="Title"
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
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
                          multiple
                          onChange={(e) => {
                            console.log("Selected");
                          }}
                        ></input>
                        <button className="rounded-pill">Upload</button>
                      </div>
                      <div className="center">
                        {/* {console.log(this.state.selectedFile)} */}
                        <img
                          src="https://www.ajoure-men.de/wp-content/uploads/2020/12/Reddit-Titelbild.jpg"
                          alt=""
                          id="img"
                          className="img"
                        />
                      </div>
                    </div>
                  );
                }
              })()}

              <span>
                <div style={{ marginTop: "5px" }} className="float-right">
                  {/* <button className="btnDiscard">Discard</button> */}
                  <button
                    className="btnCreatePost"
                    onClick={(e) => {
                      handlePost();
                    }}
                  >
                    Post
                  </button>
                </div>
              </span>
            </div>
          </div>
          <div className="col-md-3">
            <Rules />
          </div>
        </div>
      </div>
    </div>
  );
  // }
  // else if (type === "text") {
  //   return (
  //     <div>
  //       <NavBar />
  //       <div className="container">
  //         <div className="row">
  //           <hr />
  //           <div className="create-post-container col-md-9">
  //             <form className="post-form">
  //               <div className="form-group">
  //                 <div className="create-post-heading">Create a Post</div>
  //                 <hr />
  //                 <select
  //                   className="form-control"
  //                   style={{ marginTop: "10px", marginBottom: "10px" }}
  //                 >
  //                   <option value="" selected disabled>
  //                     Select Community
  //                   </option>
  //                   <option>Community 1</option>
  //                 </select>
  //                 <hr />
  //                 <ButtonGroup
  //                   className="form-control"
  //                   //className="mb-2"
  //                   style={{
  //                     padding: "0px 0px",
  //                     flex: 1,
  //                     border: "1px solid #0079d3",
  //                   }}
  //                 >
  //                   <Button
  //                     variant="outline-primary"
  //                     className="form-control"
  //                     onClick={(e) => {
  //                       setType("text");
  //                     }}
  //                   >
  //                     <FontAwesomeIcon className="icon" icon={faFile} />
  //                     Post
  //                   </Button>
  //                   <Button
  //                     variant="outline-primary"
  //                     className="form-control"
  //                     onClick={(e) => {
  //                       setType("image");
  //                     }}
  //                   >
  //                     <FontAwesomeIcon className="icon" icon={faImage} />
  //                     Images
  //                   </Button>
  //                   <Button
  //                     variant="outline-primary"
  //                     className="form-control"
  //                     onClick={(e) => {
  //                       setType("url");
  //                     }}
  //                   >
  //                     <FontAwesomeIcon className="icon" icon={faLink} />
  //                     Links
  //                   </Button>
  //                 </ButtonGroup>
  //                 <hr />
  //                 <input
  //                   type="text"
  //                   className="form-control"
  //                   style={{ marginTop: "5px", marginBottom: "5px" }}
  //                   placeholder="Title"
  //                 ></input>

  //                 <Editor
  //                   init={{
  //                     height: 300,
  //                     menubar: false,
  //                     plugins: [
  //                       "advlist autolink lists link image charmap print preview anchor",
  //                       "searchreplace visualblocks code fullscreen",
  //                       "insertdatetime media table paste code help wordcount",
  //                     ],
  //                     toolbar:
  //                       "undo redo | formatselect | bold italic backcolor | \
  //                       alignleft aligncenter alignright alignjustify | \
  //                       bullist numlist outdent indent | removeformat | help",
  //                   }}
  //                 ></Editor>
  //                 <span>
  //                   <div style={{ marginTop: "5px" }} className="float-right">
  //                     <button className="btnDiscard">Discard</button>
  //                     <button className="btnCreatePost">Post</button>
  //                   </div>
  //                 </span>
  //               </div>
  //             </form>
  //           </div>
  //           <div className="col-md-3">
  //             <Rules />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
  //   else if (type === "image") {
  //     return (
  //       <div>
  //         <NavBar />
  //         <div className="container">
  //           <div className="row">
  //             <hr />
  //             <div className="create-post-container col-md-9">
  //               <form className="post-form">
  //                 <div className="form-group">
  //                   <div className="create-post-heading">Create a Post</div>
  //                   <hr />
  //                   <select
  //                     className="form-control"
  //                     style={{ marginTop: "10px", marginBottom: "10px" }}
  //                   >
  //                     <option value="" selected disabled>
  //                       Select Community
  //                     </option>
  //                     <option>Community 1</option>
  //                   </select>
  //                   <hr />
  //                   <ButtonGroup
  //                     className="form-control"
  //                     //className="mb-2"
  //                     style={{
  //                       padding: "0px 0px",
  //                       flex: 1,
  //                       border: "1px solid #0079d3",
  //                     }}
  //                   >
  //                     <Button
  //                       variant="outline-primary"
  //                       className="form-control"
  //                       onClick={(e) => {
  //                         setType("text");
  //                       }}
  //                     >
  //                       <FontAwesomeIcon className="icon" icon={faFile} />
  //                       Post
  //                     </Button>
  //                     <Button
  //                       variant="outline-primary"
  //                       className="form-control"
  //                       onClick={(e) => {
  //                         setType("image");
  //                       }}
  //                     >
  //                       <FontAwesomeIcon className="icon" icon={faImage} />
  //                       Images
  //                     </Button>
  //                     <Button
  //                       variant="outline-primary"
  //                       className="form-control"
  //                       onClick={(e) => {
  //                         setType("url");
  //                       }}
  //                     >
  //                       <FontAwesomeIcon className="icon" icon={faLink} />
  //                       Links
  //                     </Button>
  //                   </ButtonGroup>
  //                   <hr />
  //                   <input
  //                     type="text"
  //                     className="form-control"
  //                     style={{ marginTop: "5px" }}
  //                     placeholder="Title"
  //                   ></input>

  //                   <div
  //                     className="from-control"
  //                     style={{
  //                       border: "1px solid #ccc",

  //                       marginTop: "5px",
  //                       marginBottom: "5px",
  //                       overflow: "hidden",
  //                       backgroundColor: "rgba(255, 255, 255, 0.8)",
  //                       color: "#878a8c",
  //                       position: "relative",
  //                       borderRadius: "4px",
  //                       padding: "5px",
  //                       flex: 1,
  //                     }}
  //                   >
  //                     <input
  //                       type="file"
  //                       id="file"
  //                       accept=".png, .jpg, .jpeg"
  //                       multiple
  //                       onChange={(e) => {
  //                         console.log("Selected");
  //                       }}
  //                     ></input>
  //                     <button className="rounded-pill">Upload</button>
  //                   </div>
  //                   <div className="center">
  //                     {/* {console.log(this.state.selectedFile)} */}
  //                     <img
  //                       src="https://www.ajoure-men.de/wp-content/uploads/2020/12/Reddit-Titelbild.jpg"
  //                       alt=""
  //                       id="img"
  //                       className="img"
  //                     />
  //                   </div>

  //                   <span>
  //                     <div style={{ marginTop: "5px" }} className="float-right">
  //                       <button className="btnDiscard">Discard</button>
  //                       <button
  //                         className="btnCreatePost"
  //                         onClick={(e) => {
  //                           console.log("refresh hua");
  //                         }}
  //                       >
  //                         Post
  //                       </button>
  //                     </div>
  //                   </span>
  //                 </div>
  //               </form>
  //             </div>
  //             <div className="col-md-3">
  //               <Rules />
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }
  // }
}
export default CreatePost;
