import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Axios from "axios";
import endPointObj from "../../endPointUrl";
import "./AboutModeration.css";
import { useLocation, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
const queryString = require("query-string");

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",

    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
    backgroundColor: "#0079D3",
    height: "6vh",
    color: "white",
    textAlign: "center",
    paddingTop: "7px",
  },
  pos: {
    marginBottom: 12,
  },
});

export default function AboutModeration() {
  
  const [creationTime, setCreationTime] = React.useState("");
  const options = { year: "numeric", month: "long", day: "numeric" };
  const [returncomm, setReturncomm] = useState([]);
  const location = useLocation();

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const email = useSelector((state) => state.login.username);
  
  const getCommunityUser = () => {  
    console.log(email);
    return new Promise((resolve, reject) => {
    Axios.post(
     endPointObj.url + "api/CommunitiesListByUser",
      {
       // senderEmail : email,
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

  useEffect(() => {
    getCommunityUser().then((result) => {
      console.log("fetched");
    });
  }, []);

  return (
    <Card className={classes.root}>
      <CardContent className="about-comm-card">
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          About Moderation
        </Typography>
        <div className="row">
          <div className="col-sm-12 description">
          This is a feed for the communities that you moderate.
          </div>
          {/* <div className="col-sm-7 description">members: {memberCount}</div> */}
          <div className="col-sm-8 description">created at: {creationTime}</div>
          <div className="col-sm-7 description">community topics</div>
        </div>
      </CardContent>

      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
