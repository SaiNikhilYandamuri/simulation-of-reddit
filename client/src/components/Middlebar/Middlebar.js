import React from "react";
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable */
import { Modal,Alert } from "react-bootstrap";

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
import { Input } from "reactstrap";
function Middlebar(props) {
  const [alert, setAlert] = useState('');
  const [returncomm, setReturncomm] = useState([]);
  const [searchcommunity, setsearchcommunity] = useState([]);
  const [openmodel, setopenmodel] = useState([false]);
  const [openmodel2, setopenmodel2] = useState([false]);
  const [openmodel3, setopenmodel3] = useState([false]);
  const [searchString, setSearchString] = useState("");
  const [onChangeTriggered, setOnChangeTriggerd] = useState(false);
  const [displayList, setDisplayList] = useState([]);
  const  [requsers,setrequsers] = useState([]);
  const  [invusers,setinvusers] = useState([]);
  const  [approvusers,setapprovusers] = useState([]);
  const  [invselusers,setselinvusers] = useState([]);
  const  [commname,setcommname] = useState([]);
  const  [commname2,setcommname2] = useState([]);
  // const [user, setUser] = useState([]);
  // const [show, setShow] = useState(false);

  const handleReq = (communityname) => {
    setcommname2(communityname)
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
          searchString : "",
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
  // const handleShow = (email) => {
  //   Axios.post(
  //     endPointObj.url + "api/getCommunity",
  //     {
  //       email,
  //     },
  //     {
  //       headers: {
  //         Authorization: "jwt " + sessionStorage.getItem("token"),
  //       },
  //     }
  //   )
  //     .then((response) => {
  //       response.data.sort((a, b) => {
  //         // console.log(a.timestamp, b.timestamp);
  //         // console.log(a.timestamp < b.timestamp);
  //         return a.timestamp < b.timestamp ? 1 : -1;
  //       });
  //       console.log(response.data);
  //       setcommunity(response.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  //   //api call to fetch all the communities of the user selected
  //   setShow(true);
  // };

  // //api call to fetch all the users from all the communities  selected
  // const getUsers = () => {
  //   Axios.post(
  //     endPointObj.url + "api/getUsers",
  //     {
  //       searchString,
  //     },
  //     {
  //       headers: {
  //         Authorization: "jwt " + sessionStorage.getItem("token"),
  //       },
  //     }
  //   )
  //     .then((response) => {
  //       response.data.sort((a, b) => {
  //         // console.log(a.timestamp, b.timestamp);
  //         // console.log(a.timestamp < b.timestamp);
  //         return a.timestamp < b.timestamp ? 1 : -1;
  //       });
  //       console.log(response.data);
  //       setUser(response.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  const email = useSelector((state) => state.login.username);
  
  const getCommunityUser = () => {  
    console.log(email);
    return new Promise((resolve, reject) => {
    Axios.post(
     endPointObj.url + "api/CommunitiesListByUser",
      {
        senderEmail : "danesh2497@reddit.com",
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

  useEffect(() => {
    getCommunityUser();
    //getCommunity();
  //  getSearchCommunity();
  }, []);


  const invite = (communityName) => {
    let selusers= [];
    console.log(invselusers);
    console.log(communityName);
    invselusers.map((com) => 
       selusers.push(com)
    )
    console.log(selusers);

    Axios.post(
      endPointObj.url + "api/inviteToJoinCommunity",
      {
        email :  selusers,
        communityName : communityName, 
      },
      {
        headers: {
          Authorization: "jwt " + sessionStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        console.log(response.data);      
      })
      .catch((e) => {
        console.log(e);
      });
   
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

  const approve = () => {
    console.log("in aprrove");
    console.log(approvusers)
    approvusers.map((com) => {
    Axios.post(
      endPointObj.url + "api/acceptInvitationByUser",
      {
        email : com,
        communityName: commname2,
      },
      {
        headers: {
          Authorization: "jwt " + sessionStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
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

    setSearchString(opt.target.value);
    getSearchCommunity(opt.target.value, " ");
    setOnChangeTriggerd(true);

    let final_list = list.filter((li) => {
      return li.communityName.includes(opt.target.value);
    });
    setDisplayList(final_list);
  };
  const handlearrayuser = (email) => {
   
    setapprovusers(approvusers => [...approvusers,email] );
  };

  const handlearrayuserinv = (email) => {
    setselinvusers(invselusers=> [...invselusers,email])
  };
  
  return (
    <div className="App__content">
      {" "}
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
        <Modal.Header closeButton>
          <Modal.Title>Uses requested to join</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="info">
            
              <div>
              {requsers.map((com) => (
                <header>
                
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    onClick={() => {handlearrayuser(com)}}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                  <a className="posturl">{com}</a>
                  </label>
                </div>
                </header>
                ))}
                <Button
                          variant="contained"
                          color="primary"
                          className="login-button-width"
                          onClick={() => {
                            approve();
                          }}
                        >
                          Approve
                        </Button>
              </div>
          
          </div>
        </Modal.Body>
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
        <Modal.Body >
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
                    onClick={() => {handlearrayuserinv(com.email)}}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                  <a className="posturl">{com.email}</a>
                  </label>
                </div>
                </header>
                ))}
                <Button
                          variant="contained"
                          color="primary"
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
                  <Button variant="secondary" onClick={() => {handleReq(com.communityName)}}>
                Requests
              </Button>
              <Button variant="secondary" onClick={() => {handleInv(com.communityName)}}>
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
              <div class="info">
                <header>
                  <span className="subreddit-text">
                    <a className="posturl">{com.communityName}</a>
                  </span>
                </header>
                <span>
              
                <Button variant="secondary" onClick={() => {handleReq(com.communityName)}}>
               
                Requests
              </Button>
              
             
              <Button variant="secondary" onClick={() => {handleInv(com.communityName)}}>
                Invite
              </Button>
            
              {/* <Button variant="secondary" onClick={handleInv()}>
                Invite
              </Button> */}
                </span>
              </div>
            ))}
        </span>

        {alert.length > 0 && (
          <Alert className="alert" key="0" variant="danger">
            {alert}
          </Alert>
        )}


      </div>
    </div>
  );

  


}
export default Middlebar;

