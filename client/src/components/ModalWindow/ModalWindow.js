import React, { useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useLocation, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import loginImage from "../resources/loginImage.PNG";
import createCommunityImage from "../resources/createCommunity.PNG";
import { setUser } from "../../actions";
import "./ModalWindow.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import endPointObj from "../../endPointUrl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import { v4 as uuidv4 } from "uuid";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";

const queryString = require("query-string");

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    overflow: "scroll",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: "95.7vh",
    width: "45vw",
    padding: "0px",
  },
}));

const multiInputUseStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const useStylesForm = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const useStylesFormDropDown = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),

    width: "36.5vw",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const useStylesAlert = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function ModalWindow() {
  const classesAlert = useStylesAlert();

  const email = useSelector((state) => state.login.username);
  console.log(email);
  const dispatch = useDispatch();
  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  const classes = useStyles();
  const classesInput = multiInputUseStyles();
  const [topicName, setTopicName] = React.useState([]);
  const theme = useTheme();
  const formClasses = useStylesForm();
  const formDropDown = useStylesFormDropDown();
  const [open, setOpen] = React.useState(false);
  const [emailState, setEmailState] = React.useState("");
  const [usernameState, setUsernameState] = React.useState("");
  const [usernameValidState, setUsernameValidState] = React.useState(true);
  const [usernameValidTextState, setUsernameValidTextState] =
    React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");
  const [descriptionState, setDescriptionNameState] = React.useState("");
  const [communityNameState, setCommunityNameState] = React.useState("");
  const [selectedFiles, setSelectedFiles] = React.useState([]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [emailValidState, setEmailValidState] = React.useState(true);
  const [passwordValidState, setPasswordValidState] = React.useState(true);
  const [passwordValidTextState, setPasswordValidTextState] =
    React.useState("");
  const [emailValidTextState, setEmailValidTextState] = React.useState("");
  const [passwordState, setPasswordState] = React.useState("");
  const [inputFields, setInputFields] = React.useState([
    { id: uuidv4(), title: "", description: "" },
  ]);
  const location = useLocation();

  const history = useHistory();

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function inputValidatorLogin(email, password) {
    let flag = true;
    if (email === "") {
      setEmailValidState(false);
      setEmailValidTextState("email cannot be empty");
      flag = false;
    } else {
      if (!validateEmail(email)) {
        setEmailValidState(false);
        setEmailValidTextState("invalid email address");
        flag = false;
      }
    }
    console.log(password);

    if (password === "") {
      setPasswordValidState(false);
      setPasswordValidTextState("Password cannot be empty");
      flag = false;
    }

    return flag;
  }

  const inputValidatorSignUp = (username, email, password) => {
    let flag = true;
    if (email === "") {
      setEmailValidState(false);
      setEmailValidTextState("email cannot be empty");
      console.log("email validator");
      flag = false;
    } else {
      if (!validateEmail(email)) {
        setEmailValidState(false);
        setEmailValidTextState("invalid email address");
        flag = false;
      }
    }

    if (password === "") {
      setPasswordValidState(false);
      setPasswordValidTextState("Password cannot be empty");
      flag = false;
    }

    if (username === "") {
      setUsernameValidState(false);
      setUsernameValidTextState("Username cannot be empty");
      flag = false;
    }

    return flag;
  };

  const createCommunity = async (communityName, topics, rules, description) => {
    // console.log(commName, topics, rules, description);

    await Axios.post(
      endPointObj.url + "api/createCommunity",
      {
        createdBy: email,
        communityName,
        rules,
        description,
      },
      {
        headers: {
          Authorization: "jwt " + sessionStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        history.push({
          pathname: "/communityPage",
          search: "?name=" + communityName,
        });
        console.log("successfully create community");
      })
      .catch((err) => {
        console.error("an error occured");
        if (err.response && err.response.data) {
          setAlertMessage(err.response.data);
        }
      });
    let formData=new FormData();
    console.log("Printing state of files",selectedFiles)
    
    for(let i=0;i<selectedFiles.length;i++)
    {
      formData.append("file",selectedFiles[i])
    }
    console.log("Done with appending")
    
    await Axios.post(
      endPointObj.url + "api/multipleImages",
      {formData,
      community_name:communityName},
      {
        headers: {
          Authorization: "jwt " + sessionStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
       
        console.log("successfully uploaded images to community");
      })
      .catch((err) => {
        console.error("an error occured");
        
      });
  
        
      
      
  };

  const signUp = (name, email, password) => {
    console.log("signUp");

    if (inputValidatorSignUp(name, email, password)) {
      Axios.post(endPointObj.url + "api/signup", {
        name,
        email,
        password,
      })
        .then((response) => {
          sessionStorage.setItem("token", response.data.token.split(" ")[1]);
          dispatch(setUser(email, true));
          history.push({
            pathname: "/home",
          });
          setOpen(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const login = (email, password) => {
    if (inputValidatorLogin(email, password)) {
      Axios.post(endPointObj.url + "api/login", {
        email,
        password,
      })
        .then((response) => {
          sessionStorage.setItem("token", response.data.token.split(" ")[1]);
          dispatch(setUser(email, true));
          history.push({
            pathname: "/home",
          });
          setOpen(false);
        })
        .catch((err) => {
          console.log("before erro");
          // console.log(err.response.data.message);

          if (err.response && err.response.data) {
            setPasswordValidState(false);
            setPasswordValidTextState(err.response.data.message);
          }

          console.error(err);
        });
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (
      queryString.parse(location.search).type === "signUp" ||
      queryString.parse(location.search).type === "login"
    ) {
      history.push({
        pathname: "/",
        search: "?modalOpen=false",
      });
    }

    if (queryString.parse(location.search).type === "createCommunity") {
      history.push({
        pathname: "/home",
        search: "?modalOpen=false",
      });
    }
    setOpen(false);
  };

  const setEmail = (e) => {
    setEmailState(e.target.value);
    setEmailValidState(true);
    setEmailValidTextState("");
  };

  const setUsername = (e) => {
    setUsernameValidState(true);
    setUsernameState(e.target.value);
    setUsernameValidTextState("");
  };

  const setPassword = (e) => {
    setPasswordState(e.target.value);
    setPasswordValidState(true);
    setPasswordValidTextState("");
  };

  const handleChangeTopic = (event) => {
    console.log(event.target.value);
    setTopicName(event.target.value);
  };

  const imgChangeHandler = (event) => {
    let image_array=[]
    for(let i=0;i<event.target.files.length;i++)
    {
    
    image_array.push(event.target.files[i])
    console.log("Current file",event.target.files[i])
    }
    console.log("Printing all image array",image_array)
    setSelectedFiles(image_array)
    
	};

  useEffect(() => {
    setPasswordValidTextState("");
    setPasswordValidState(true);
    setUsernameValidTextState("");
    setUsernameValidState(true);
    setEmailValidTextState("");
    setEmailValidState(true);
    if (queryString.parse(location.search).modalOpen === "true") {
      handleOpen();
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("InputFields", inputFields);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { id: uuidv4(), title: "", description: "" },
    ]);
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    console.log(newInputFields);

    setInputFields(newInputFields);
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  const communityName = (e) => {
    console.log(e.target.value);
    setCommunityNameState(e.target.value);
  };

  const addDescription = (e) => {
    console.log(e.target.value);
    setDescriptionNameState(e.target.value);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Grid container spacing={0}>
              <Grid
                item
                xs={
                  queryString.parse(location.search).type === "createCommunity"
                    ? 1
                    : 3
                }
              >
                {(queryString.parse(location.search).type === "login" ||
                  queryString.parse(location.search).type === "signUp") && (
                  <img src={loginImage} className="login-image" />
                )}

                {queryString.parse(location.search).type ===
                  "createCommunity" && (
                  <img src={createCommunityImage} className="login-image" />
                )}
              </Grid>
              <Grid
                item
                xs={
                  queryString.parse(location.search).type === "createCommunity"
                    ? 10
                    : 8
                }
              >
                <form
                  className={formClasses.root}
                  autoComplete="off"
                  className={
                    queryString.parse(location.search).type !==
                    "createCommunity"
                      ? "login-form-data"
                      : "comm-form-data"
                  }
                >
                  {queryString.parse(location.search).type === "login" && (
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <TextField
                          error={!emailValidState}
                          helperText={emailValidTextState}
                          className="login-text-field"
                          id="outlined-secondary"
                          label="Email"
                          variant="outlined"
                          color="secondary"
                          type="email"
                          onChange={(e) => {
                            setEmail(e);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          error={!passwordValidState}
                          className="login-text-field"
                          id="outlined-secondary"
                          label="Password"
                          variant="outlined"
                          helperText={passwordValidTextState}
                          type="password"
                          color="secondary"
                          onChange={(e) => {
                            setPassword(e);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          className="login-button-width"
                          onClick={() => {
                            login(emailState, passwordState);
                          }}
                        >
                          Log In
                        </Button>
                      </Grid>
                    </Grid>
                  )}

                  {queryString.parse(location.search).type ===
                    "createCommunity" && (
                    <Grid container spacing={2}>
                      <Grid item xs={12} className="comm-form-title">
                        Create Community
                      </Grid>

                      <Grid item xs={12}>
                        <Grid item xs={12} className="comm-text-title">
                          Name
                        </Grid>
                        <TextField
                          className="comm-text-field"
                          id="outlined-secondary"
                          variant="outlined"
                          color="secondary"
                          onChange={(e) => {
                            communityName(e);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Grid item xs={12} className="comm-text-title">
                          Topics
                        </Grid>
                        <FormControl className={formDropDown.formControl}>
                          <InputLabel id="demo-simple-select-helper-label">
                            Add topics
                          </InputLabel>
                          <Select
                            className="comm-multi-select"
                            labelId="demo-mutiple-chip-label"
                            id="demo-mutiple-chip"
                            multiple
                            value={topicName}
                            onChange={handleChangeTopic}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={(selected) => (
                              <div className={classes.chips}>
                                {selected.map((value) => (
                                  <Chip
                                    key={value}
                                    label={value}
                                    className={classes.chip}
                                  />
                                ))}
                              </div>
                            )}
                            MenuProps={MenuProps}
                          >
                            {names.map((name) => (
                              <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, topicName, theme)}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <InputLabel
                          id="demo-simple-select-helper-label"
                          className="comm-rules-title"
                        >
                          Add rules
                        </InputLabel>
                        <form
                          className={classesInput.root}
                          onSubmit={handleSubmit}
                        >
                          {inputFields.map((inputField) => (
                            <div
                              key={inputField.id}
                              className="comm-multi-text-box"
                            >
                              <TextField
                                className="comm-rule-title-description"
                                name="title"
                                label="title"
                                variant="filled"
                                value={inputField.title}
                                onChange={(event) =>
                                  handleChangeInput(inputField.id, event)
                                }
                              />
                              <TextField
                                className="comm-rule-title-description"
                                name="description"
                                label="description"
                                variant="filled"
                                value={inputField.description}
                                onChange={(event) =>
                                  handleChangeInput(inputField.id, event)
                                }
                              />
                              <IconButton
                                disabled={inputFields.length === 1}
                                onClick={() =>
                                  handleRemoveFields(inputField.id)
                                }
                              >
                                <RemoveIcon />
                              </IconButton>
                              <IconButton onClick={handleAddFields}>
                                <AddIcon />
                              </IconButton>
                            </div>
                          ))}
                        </form>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid item xs={12} className="comm-text-title">
                          Description
                        </Grid>
                        <TextField
                          onChange={(e) => {
                            addDescription(e);
                          }}
                          className="comm-text-field"
                          id="outlined-secondary"
                          variant="outlined"
                          color="secondary"
                        />
                      </Grid>

                      <Grid item xs={12}>
                      
                      <input type="file" name="file" multiple="multiple" onChange={imgChangeHandler} />
                    

                         
                      </Grid>



                      <Grid item xs={12} className="comm-cancel-create">
                        <Button
                          color="primary"
                          onClick={() => {
                            handleClose();
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            createCommunity(
                              communityNameState,
                              topicName,
                              inputFields,
                              descriptionState
                            );
                          }}
                        >
                          Create Community
                        </Button>
                        {alertMessage.length > 0 && (
                          <div className={classesAlert.root}>
                            <Alert severity="error">{alertMessage}</Alert>
                          </div>
                        )}
                      </Grid>
                    </Grid>
                  )}

                  {queryString.parse(location.search).type === "signUp" && (
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <TextField
                          error={!usernameValidState}
                          className="login-text-field"
                          id="outlined-secondary"
                          label="Username"
                          variant="outlined"
                          color="secondary"
                          helperText={usernameValidTextState}
                          onChange={(e) => {
                            setUsername(e);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          error={!emailValidState}
                          helperText={emailValidTextState}
                          className="login-text-field"
                          id="outlined-secondary"
                          label="Email"
                          variant="outlined"
                          color="secondary"
                          onChange={(e) => {
                            setEmail(e);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          error={!passwordValidState}
                          className="login-text-field"
                          id="outlined-secondary"
                          label="Password"
                          variant="outlined"
                          helperText={passwordValidTextState}
                          type="password"
                          color="secondary"
                          onChange={(e) => {
                            setPassword(e);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          className="login-button-width"
                          onClick={() => {
                            signUp(usernameState, emailState, passwordState);
                          }}
                        >
                          Sign Up
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                </form>
              </Grid>
              <Grid item xs={1} className="login-close">
                {" "}
                <i
                  class="login-close-icon fas fa-times"
                  onClick={() => {
                    handleClose();
                  }}
                ></i>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
