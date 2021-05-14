import React from "react";
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable */
import { Modal, Alert } from "react-bootstrap";

import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Middlebar.css";
import { ListGroup, Button, Nav } from "react-bootstrap";
const queryString = require("query-string");
import Axios from "axios";
import endPointObj from "../../endPointUrl";
import post from "../resources/post.png";
import { Col, NavDropdown, Dropdown } from "react-bootstrap";
import { Input } from "reactstrap";
function Middlebar(props) {
  let globalPageNum = 1;
  const [alert, setAlert] = useState("");
  const [returncomm, setReturncomm] = useState([]);

  const [searchcommunity, setsearchcommunity] = useState([]);
  const [openmodel, setopenmodel] = useState(false);
  const [openmodel2, setopenmodel2] = useState(false);

  const [searchString, setSearchString] = useState("");
  const [onChangeTriggered, setOnChangeTriggerd] = useState(false);
  const [displayList, setDisplayList] = useState([]);
  const [requsers, setrequsers] = useState([]);
  const [invusers, setinvusers] = useState([]);
  const [approvusers, setapprovusers] = useState([]);
  const [invselusers, setselinvusers] = useState([]);
  const [commname, setcommname] = useState([]);
  const [commname2, setcommname2] = useState([]);

  const [pageSize, setPageSize] = useState(2);
  const [pageNum, setPageNum] = useState(1);

  const handleReq = (communityname) => {
    setcommname2(communityname);
    console.log(communityname);
    Axios.post(
      endPointObj.url + "api/RequestedUsersList",
      {
        communityName: communityname,
      },
      {
        headers: {
          Authorization: "jwt " + sessionStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        console.log(response.data.results);
        setrequsers(response.data.results);
      })
      .catch((e) => {
        console.log(e);
      });

    setopenmodel(true);
  };

  const handleInv = (communityname) => {
    setcommname(communityname);
    Axios.post(
      endPointObj.url + "api/searchUser",
      {
        searchString: "",
      },
      {
        headers: {
          Authorization: "jwt " + sessionStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        console.log(response.data);
        setinvusers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });

    setopenmodel2(true);
  };

  const handleClose = () => {
    setopenmodel(false);
  };
  const handleClose2 = () => {
    setopenmodel2(false);
  };

  const email = useSelector((state) => state.login.username);

  const getCommunityUser = (pageNum, pageSize) => {
    setPageSize(pageSize);
    console.log(email);
    return new Promise((resolve, reject) => {
      Axios.post(
        endPointObj.url + "api/CommunitiesListByUser",
        {
          // senderEmail : email,
          senderEmail: email,
          pageNum: pageNum,
          pageSize: pageSize,
        },
        {
          headers: {
            Authorization: "jwt " + sessionStorage.getItem("token"),
          },
        }
      )
        .then((response) => {
          console.log(response.data);

          setReturncomm(response.data.results);
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };

  useEffect(() => {
    getCommunityUser(1, 2);
  }, []);

  const invite = (communityName) => {
    let selusers = [];
    console.log(invselusers);
    console.log(communityName);
    invselusers.map((com) => selusers.push(com));
    console.log(selusers);

    Axios.post(
      endPointObj.url + "api/inviteToJoinCommunity",
      {
        email: selusers,
        communityName: communityName,
      },
      {
        headers: {
          Authorization: "jwt " + sessionStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        setopenmodel2(false);
        setopenmodel(false);
        console.log(response.data);
        setAlert(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const approve = () => {
    console.log("in aprrove");
    console.log(approvusers);
    approvusers.map((com) => {
      Axios.post(
        endPointObj.url + "api/acceptInvitationByUser",
        {
          email: com,
          communityName: commname2,
        },
        {
          headers: {
            Authorization: "jwt " + sessionStorage.getItem("token"),
          },
        }
      )
        .then((response) => {
          setopenmodel2(false);
          setopenmodel(false);
          console.log(response.data);
          setAlert(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };
  const onChange = (opt, list) => {
    if (opt == null || opt == "undefined") {
      opt = "";
    }

    // setSearchString(opt.target.value);
    // getSearchCommunity(opt.target.value, " ");
    setOnChangeTriggerd(true);

    let final_list = list.filter((li) => {
      return li.communityName.includes(opt.target.value);
    });
    setDisplayList(final_list);
  };

  const time = (timestamp) => {
    if (timestamp) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      timestamp = new Date(timestamp).toLocaleDateString(undefined, options);
      return timestamp;
    }
    return "";
  };
  const handlearrayuser = (email) => {
    setapprovusers((approvusers) => [...approvusers, email]);
  };

  const handlearrayuserinv = (email) => {
    setselinvusers((invselusers) => [...invselusers, email]);
  };

  const onClickNext = (pageNum, pageSize) => {
    console.log(pageNum);
    globalPageNum = pageNum + 1;

    setPageNum(globalPageNum);

    getCommunityUser(globalPageNum, pageSize);
  };

  const onClickPrev = (pageNum, pageSize) => {
    if (pageNum > 1) {
      globalPageNum = pageNum - 1;
      setPageNum(globalPageNum);

      getCommunityUser(globalPageNum, pageSize);
    }
  };

  return (
    <div className="App__content">
      <Dropdown className="drop-down">
        <Dropdown.Toggle
          variant="dark"
          className="toggle-mod"
          id="dropdown-basic"
        >
          {pageSize}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              getCommunityUser(pageNum, 2);
            }}
          >
            2
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              getCommunityUser(pageNum, 5);
            }}
          >
            5
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              getCommunityUser(pageNum, 10);
            }}
          >
            10
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>{" "}
      <div className="post-title">
        <a className="postname" href="">
          Your Community
        </a>
      </div>
      <Input
        type="text"
        placeholder="Search Community Name"
        onChange={(opt) => onChange(opt, returncomm)}
        pattern="^[a-zA-Z]+([ ]{1}[a-zA-Z]+)*$"
        title="It can only contain letters, single space character. It must start with letter and cannot end with special character"
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modal"
        closeAfterTransition
        show={openmodel}
        onHide={handleClose}
      >
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Users requested to join</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div>
              {requsers.map((com) => (
                <header>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      onClick={() => {
                        handlearrayuser(com);
                      }}
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      <a className="posturl">{com}</a>
                    </label>
                  </div>
                </header>
              ))}
              <Button
                variant="dark"
                onClick={() => {
                  approve();
                }}
              >
                Approve
              </Button>
            </div>
          </Modal.Body>
        </div>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modal"
        closeAfterTransition
        show={openmodel2}
        onHide={handleClose2}
      >
        <Modal.Header closeButton>
          <Modal.Title>Select users to invite</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="info">
            <div>
              {invusers.map((com) => (
                <header>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      onClick={() => {
                        handlearrayuserinv(com.email);
                      }}
                    />
                    {/* <label class="form-check-label" for="flexCheckDefault"> */}
                    <label class="form-check-label">
                      <a className="posturl">{com.email}</a>
                      <br />
                      <a className="posturl">{com.name}</a>
                    </label>
                  </div>
                </header>
              ))}
              <Button
                variant="contained"
                className="login-button-width"
                onClick={() => {
                  invite(commname);
                }}
              >
                Invite
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div>
        <span>
          {onChangeTriggered == true &&
            displayList.map((com) => (
              <div class="info">
                <header>
                  <span className="subreddit-text">
                    <a className="posturl">{com.communityName}</a>
                  </span>
                </header>
                <span>
                  {/* <Link
                    data-testid="Group"
                    key={com.communityName}
                    onClick={() => {
                      handleOpen(com.communityName);
                    }}
                    className="links-dashboard-groups"
                  >
                    {com.requestedToJoin.length} Users requested to Join
                    <br />
                  </Link> */}
                  <Button
                    variant="secondary"
                    onClick={() => {
                      handleReq(com.communityName);
                    }}
                  >
                    Requests
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      handleInv(com.communityName);
                    }}
                  >
                    Invite
                  </Button>
                  {/* <Button variant="secondary" onClick={handleOpen (a.communityName)}>
                Invite
              </Button> */}
                </span>
              </div>
            ))}
        </span>

        <span>
          {onChangeTriggered == false &&
            returncomm.map((com) => (
              <article className="mod-list-width">
                {/* <article > */}

                <div className="row">
                  <div className="col-sm-1">
                    <img src={post} height="55" width="55" class="thumbnail" />
                  </div>
                  <div className="col-sm-6">
                    <div class="info">
                      <header>
                        <span className="subreddit-text">
                          <a className="posturl">{com.communityName}</a>
                        </span>
                      </header>
                      <div>
                        submitted on {time(com.creationTime)} by{" "}
                        <span class> {com.createdBy}</span>
                      </div>

                      <span>
                        <Button
                          variant="dark"
                          className="approve-invite"
                          onClick={() => {
                            handleReq(com.communityName);
                          }}
                        >
                          Approve
                        </Button>
                        &nbsp;&nbsp;
                        <Button
                          variant="dark"
                          className="approve-invite"
                          onClick={() => {
                            handleInv(com.communityName);
                          }}
                        >
                          Invite
                        </Button>
                        {/* <Button variant="secondary" onClick={handleInv()}>
                Invite
              </Button> */}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
        </span>

        {alert.length > 0 && (
          <Alert className="alert" key="0" variant="danger">
            {alert}
          </Alert>
        )}

        <center>
          <Button
            color="primary"
            variant="dark"
            onClick={() => {
              onClickNext(pageNum, pageSize);
            }}
          >
            Next
          </Button>
          &nbsp;
          <Button
            variant="dark"
            onClick={() => {
              onClickPrev(pageNum, pageSize);
            }}
          >
            Previous
          </Button>
        </center>
      </div>
    </div>
  );
}
export default Middlebar;

{
  /* <article className="row post-width">


<img src={post} height="55" width="55" class="thumbnail" />
<div class="info">
 
  <div>
    submitted on {time(com.creationTime)} by{" "}
    <span class> {com.createdBy}</span>
    from{" "}
    <span>
      <Nav.Link
        data-testid="Group"
        key={com.description}
        onClick={() => communityPage(com.communityName)}
        className="posturl"
      >
        {com.communityName}
      </Nav.Link>
    </span>
  </div>
</div>
</article> */
}
