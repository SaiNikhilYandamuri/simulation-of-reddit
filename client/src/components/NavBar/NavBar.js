import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import "./NavBar.css";
//import mainLogo from "../resources/redditImage.PNG";

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

  return (
    <div className={classes.root}>
      <AppBar position="static" className="nav-bar ">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {/* <img src={mainLogo} className="reddit-image" /> */}
          </Typography>
          <Button href="#text-buttons" color="primary">
            Log In
          </Button>
          &nbsp;
          <Button variant="contained" color="primary" href="#contained-buttons">
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
