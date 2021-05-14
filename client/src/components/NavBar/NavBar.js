import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AssessmentIcon from "@material-ui/icons/Assessment";
import "./NavBar.css";
import { useHistory } from "react-router-dom";
import mainLogo from "../resources/redditImage.PNG";
import Login from "../ModalWindow/ModalWindow";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import CheckIcon from "@material-ui/icons/Check";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import mod from "../resources/mod.png";
import MoreIcon from "@material-ui/icons/MoreVert";

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
  const redirectToSearch = () => {
    history.push({
      pathname: "/searchcommunity",
    });
  };
  const redirectToMod = () => {
    history.push({
      pathname: "/communitymoderation",
    });
  };
  const history = useHistory();

  const classes = useStyles();

  const redirectToHome = () => {
    history.push({
      pathname: "/home",
    });
  };

  const redirectToMessages = () => {
    history.push({
      pathname: "/StartChat",
    });
  };

  const redirectToAnalytics = () => {
    history.push({
      pathname: "/analytics",
    });
  };

  const redirectToInvitations = () => {
    history.push({
      pathname: "/invitationPage",
    });
  };

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
            <img
              src={mainLogo}
              className="reddit-image"
              onClick={() => {
                redirectToHome();
              }}
            />
          </Typography>
          {sessionStorage.getItem("token") !== null && (
            <div className={classes.sectionDesktop}>
              <img
                src={mod}
                className="reddit-image"
                onClick={() => {
                  redirectToMod();
                }}
              />
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge color="secondary">
                  <QuestionAnswerIcon
                    className="icon"
                    onClick={() => {
                      redirectToMessages();
                    }}
                  />
                </Badge>
              </IconButton>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge color="secondary">
                  <AssessmentIcon
                    className="icon"
                    onClick={() => {
                      redirectToAnalytics();
                    }}
                  />
                </Badge>
              </IconButton>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge color="secondary">
                  <CheckIcon
                    className="icon"
                    onClick={() => {
                      redirectToInvitations();
                    }}
                  />
                </Badge>
              </IconButton>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge color="secondary">
                  <SearchIcon
                    className="icon"
                    onClick={() => {
                      redirectToSearch();
                    }}
                  />
                </Badge>
              </IconButton>
            </div>
          )}
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
