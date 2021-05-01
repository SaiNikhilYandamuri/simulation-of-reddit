import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useLocation, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import loginImage from "../resources/loginImage.PNG";
import "./Login.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import endPointObj from "../../endPointUrl";

const queryString = require("query-string");

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: "95.7vh",
    width: "45vw",
    padding: "0px",
  },
}));

const useStylesGrid = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
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

export default function Login() {
  const classes = useStyles();
  const formClasses = useStylesForm();
  const [open, setOpen] = React.useState(false);
  const [emailState, setEmailState] = React.useState("");
  const [usernameState, setUsernameState] = React.useState("");
  const [usernameValidState, setUsernameValidState] = React.useState(true);
  const [usernameValidTextState, setUsernameValidTextState] = React.useState(
    ""
  );

  const [emailValidState, setEmailValidState] = React.useState(true);
  const [passwordValidState, setPasswordValidState] = React.useState(true);
  const [passwordValidTextState, setPasswordValidTextState] = React.useState(
    ""
  );
  const [emailValidTextState, setEmailValidTextState] = React.useState("");
  const [passwordState, setPasswordState] = React.useState("");
  const location = useLocation();

  const history = useHistory();

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    history.push({
      pathname: "/",
      search: "?modalOpen=false",
    });
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

  useEffect(() => {
    if (queryString.parse(location.search).modalOpen === "true") {
      handleOpen();
    }
  }, [location]);

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
              <Grid item xs={3}>
                <img src={loginImage} className="login-image" />
              </Grid>
              <Grid item xs={8}>
                <form
                  className={formClasses.root}
                  autoComplete="off"
                  className="login-form-data"
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
