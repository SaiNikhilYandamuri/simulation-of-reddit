import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import NavigationBar from "../NavBar/NavBar";
import "./CommunityPage.css";
import AboutCommunity from "../AboutCommunity/AboutCommunity";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: "15vh",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  paperPost: {
    height: "15vh",
    textAlign: "center",
    color: theme.palette.text.secondary,
    marginLeft: "2vw",
    marginTop: "3vh",
    height: "40vh",
  },
  paperBlue: {
    backgroundColor: "#33a8ff",
    height: "10vh",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function CommunityPage() {
  const classes = useStyles();

  return (
    <div className="comm-page-bg">
      <div className={classes.root}>
        <NavigationBar></NavigationBar>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Paper className={classes.paperBlue}></Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}></Paper>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={1}></Grid>
              <Grid item xs={7}>
                <Paper className={classes.paperPost}>7</Paper>
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
