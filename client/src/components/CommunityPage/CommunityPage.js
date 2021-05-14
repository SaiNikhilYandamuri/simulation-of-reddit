import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation, Switch, useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import NavigationBar from "../NavBar/NavBar";
import "./CommunityPage.css";
import AboutCommunity from "../AboutCommunity/AboutCommunity";
import hot from "../resources/hot.PNG";
import newImage from "../resources/new.PNG";
import top from "../resources/top.PNG";
import Axios from "axios";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import endPointObj from "../../endPointUrl";
import PostTile from "../PostTile/PostTile";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";

const queryString = require("query-string");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: "15vh",
    alignItems: "left",
    marginTop: "-7px",
    color: theme.palette.text.secondary,
  },

  paperPost: {
    height: "15vh",
    textAlign: "center",
    color: theme.palette.text.secondary,
    marginLeft: "2vw",
    marginTop: "3vh",
    height: "10vh",
  },
  paperBlue: {
    backgroundColor: "#33a8ff",
    height: "10vh",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function CommunityPage() {
  const email = useSelector((state) => state.login.username);
  const history = useHistory();
  const location = useLocation();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();
  const [inviteStatus, setInviteStatus] = React.useState("NA");
  const [title, setTitle] = React.useState("");
  const [value, setValue] = React.useState(2);
  const [posts, setPosts] = React.useState([]);

  const redirectToCreate = () => {
    history.push({
      pathname: "/createpost",
      search: `?communityname=${queryString.parse(location.search).name}`,
    });
  };

  let getCommunity = () => {
    return new Promise((resolve, reject) => {
      Axios.post(
        endPointObj.url + "api/getCommunity",
        {
          communityName: queryString.parse(location.search).name,
        },
        {
          headers: {
            Authorization: "jwt " + sessionStorage.getItem("token"),
          },
        }
      )
        .then((response) => {
          console.log("successfully fetched comm");
          setTitle(response.data.communityName);
        })
        .catch((err) => {
          console.error("an error occured");
          if (err.response && err.response.data) {
          }
        });
    });
  };

  let checkApprovedStatus = () => {
    return new Promise((resolve, reject) => {
      Axios.post(
        endPointObj.url + "api/checkApprovedStatus",
        {
          email: email,
          communityName: queryString.parse(location.search).name,
        },
        {
          headers: {
            Authorization: "jwt " + sessionStorage.getItem("token"),
          },
        }
      )
        .then((response) => {
          console.log(response);
          if (response.data === "You don't have permission") {
            setInviteStatus("Join");
          } else if (response.data === "Permission granted") {
            setInviteStatus("Joined");
          } else if (response.data === "Admin yet to give approval") {
            setInviteStatus("Pending");
          }

          console.log(response);
        })
        .catch((err) => {
          console.error("an error occured");
          if (err.response && err.response.data) {
          }
        });
    });
  };

  let getPosts = (sortExpression) => {
    return new Promise((resolve, reject) => {
      Axios.post(
        endPointObj.url + "api/getPost",
        {
          communityName: queryString.parse(location.search).name,
          sort: sortExpression,
        },
        {
          headers: {
            Authorization: "jwt " + sessionStorage.getItem("token"),
          },
        }
      )
        .then((response) => {
          console.log(response);

          setPosts(response.data);
        })
        .catch((err) => {
          console.error("an error occured");
          if (err.response && err.response.data) {
          }
        });
    });
  };

  //gk
  const handletop = () => {
    console.log("top");
    getPosts("numberOfUpvotesDesc");
  };
  //gk

  const handlenew = () => {
    console.log("new");
    getPosts("");
  };
  const onHover = (status) => {
    console.log(status);
    if (status == "Joined") {
      setInviteStatus("leave");
    }
    // if (status == "leave") {
    //   setInviteStatus("Join");
    // }
  };

  const onHoverOut = (status) => {
    console.log(status);
    // if (status == "Joined") {
    //   setInviteStatus("leave");
    // }
    if (status == "leave") {
      setInviteStatus("Joined");
    }
  };

  const leaveCommunity = () => {
    return new Promise((resolve, reject) => {
      Axios.post(
        endPointObj.url + "api/leaveCommunity",
        {
          communityName: queryString.parse(location.search).name,
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
          setInviteStatus("Join");
          checkApprovedStatus().then((result) => {
            console.log(result);
          });
        })
        .catch((err) => {
          console.error("an error occured");
          if (err.response && err.response.data) {
          }
        });
    });
  };

  const requestToJoinCommunity = () => {
    return new Promise((resolve, reject) => {
      Axios.post(
        endPointObj.url + "api/requestToJoinCommunity",
        {
          communityName: queryString.parse(location.search).name,
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
          checkApprovedStatus().then((result) => {
            console.log(result);
          });
        })
        .catch((err) => {
          console.error("an error occured");
          if (err.response && err.response.data) {
          }
        });
    });
  };

  const upVoteClickCommHome = (name) => {
    console.log(name);

    getPosts().then((result) => {
      console.log("fetched posts");
    });
  };

  const downVoteClickCommHome = (name) => {
    console.log(name);

    getPosts().then((result) => {
      console.log("fetched posts");
    });
  };

  useEffect(() => {
    getCommunity().then((result) => {
      console.log("fetched");
    });

    checkApprovedStatus().then((result) => {
      console.log(result);
    });

    getPosts().then((result) => {
      console.log("fetched posts");
    });
  }, []);

  return (
    <div className="comm-page-bg">
      <div className={classes.root}>
        <NavigationBar></NavigationBar>
        <Grid container>
          <Grid item xs={12}>
            <Paper className={classes.paperBlue}></Paper>

            <Paper className={classes.paper}>
              <h1 className="title-text">
                {title}&nbsp;{" "}
                <Button
                  variant="outlined"
                  color="primary"
                  href="#outlined-buttons"
                  onClick={() => {
                    if (inviteStatus == "Join") {
                      requestToJoinCommunity();
                    }
                    if (inviteStatus == "leave") {
                      leaveCommunity();
                    }
                  }}
                  onMouseOver={() => {
                    onHover(inviteStatus);
                  }}
                  onMouseOut={() => {
                    onHoverOut(inviteStatus);
                  }}
                >
                  {inviteStatus}
                </Button>
              </h1>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={8}>
                <Paper className={classes.paperPost}>
                  <button
                    className="btnCreatePost"
                    onClick={() => {
                      redirectToCreate();
                    }}
                  >
                    CREATE POST
                  </button>
                </Paper>
                {posts.length > 0 && (
                  <Paper className="tabs-home" square>
                    <Tabs
                      value={value}
                      indicatorColor="primary"
                      textColor="primary"
                      onChange={handleChange}
                      aria-label="disabled tabs example"
                    >
                      <Tab icon={<img src={hot}></img>}></Tab>

                      <Tab
                        icon={<img src={newImage}></img>}
                        onClick={() => {
                          handlenew();
                        }}
                      ></Tab>

                      <Tab
                        icon={<img src={top}></img>}
                        onClick={() => {
                          handletop();
                        }}
                      ></Tab>
                    </Tabs>
                  </Paper>
                )}
                {posts.map((post) => (
                  <PostTile
                    onClick={() => {
                      console.log("hello");
                    }}
                    upvoteMembersTrue={
                      post.upvoteMembers.filter((member) => member === email)
                        .length > 0
                    }
                    downvoteMembersTrue={
                      post.downvoteMembers.filter((member) => member === email)
                        .length > 0
                    }
                    className="post"
                    upVoteClickCommHome={upVoteClickCommHome}
                    postTitle={post.postTitle}
                    votes={
                      parseInt(post.numberOfUpvotes) -
                      parseInt(post.numberOfDownvotes)
                    }
                    text={post.text}
                    id={post._id}
                    createdByEmail={post.createdByEmail}
                    commName={post.communityName}
                  ></PostTile>
                ))}
              </Grid>
              <Grid item xs={3} className="comm-page-about">
                <AboutCommunity />
              </Grid>
              <Grid item xs={1}></Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
