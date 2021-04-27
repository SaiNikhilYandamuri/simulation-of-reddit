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
  const gridClasses = useStylesGrid();
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  const history = useHistory();

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
                  noValidate
                  autoComplete="off"
                  className="login-form-data"
                >
                  {queryString.parse(location.search).type === "login" && (
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <TextField
                          className="login-text-field"
                          id="outlined-secondary"
                          label="Username"
                          variant="outlined"
                          color="secondary"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          className="login-text-field"
                          id="outlined-secondary"
                          label="Password"
                          variant="outlined"
                          color="secondary"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          className="login-button-width"
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
                          className="login-text-field"
                          id="outlined-secondary"
                          label="Username"
                          variant="outlined"
                          color="secondary"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          className="login-text-field"
                          id="outlined-secondary"
                          label="Email"
                          variant="outlined"
                          color="secondary"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          className="login-text-field"
                          id="outlined-secondary"
                          label="Password"
                          variant="outlined"
                          color="secondary"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          className="login-button-width"
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
