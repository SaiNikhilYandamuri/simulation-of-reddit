import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "./NavBar.css";
import mainLogo from "../resources/redditImage.PNG";
import { useHistory } from "react-router-dom";
import Login from "../ModalWindow/ModalWindow";
import ProfileMenu from "../ProfileMenu/ProfileMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();

  const history = useHistory();

  const modalOpen = (type) => {
    history.push({
      pathname: "/",
      search: "?modalOpen=true&type=" + type,
    });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className="nav-bar ">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <img src={mainLogo} className="reddit-image" />
          </Typography>
          {sessionStorage.getItem("token") === null && (
            <Button
              onClick={() => {
                modalOpen("login");
              }}
              color="primary"
            >
              Log In
            </Button>
          )}
          &nbsp;
          {sessionStorage.getItem("token") === null && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                modalOpen("signUp");
              }}
            >
              Sign Up
            </Button>
          )}
          {sessionStorage.getItem("token") !== null && <ProfileMenu />}
        </Toolbar>
      </AppBar>
      <Login />
    </div>
  );
}
