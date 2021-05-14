import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Axios from "axios";
import endPointObj from "../../endPointUrl";
import "./AboutCommunity.css";
import { useLocation, Switch } from "react-router-dom";

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

export default function AboutCommunity() {
  const [description, setDescription] = React.useState("");
  const [memberCount, setMemberCount] = React.useState(0);
  const [creationTime, setCreationTime] = React.useState("");
  const options = { year: "numeric", month: "long", day: "numeric" };

  const location = useLocation();

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  let getCommunity = () => {
    return new Promise((resolve, reject) => {
      Axios.post(
        endPointObj.url + "api/getCommunity",
        {
          communityName: queryString.parse(location.search).name,
        },
        {
          headers: {
            Authorization: "jwt " + sessionStorage.getItem("token"),
          },
        }
      )
        .then((response) => {
          console.log("successfully fetched comm");
          console.log(response.data, "response");

          setDescription(response.data.description);
          setMemberCount(response.data.members.length);
          setCreationTime(
            new Date(response.data.creationTime).toLocaleDateString(
              undefined,
              options
            )
          );
        })
        .catch((err) => {
          console.error("an error occured");
          if (err.response && err.response.data) {
          }
        });
    });
  };

  useEffect(() => {
    getCommunity().then((result) => {
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
          About Community
        </Typography>
        <div className="row">
          <div className="col-sm-12 description">
            <b>Description:</b>
            <i>{description}</i>
          </div>

          <div className="col-sm-12 description">
            <b>Members:</b>
            <i>{memberCount}</i>
          </div>

          <div className="col-sm-12 description">
            <b>Created At:</b> <i>{creationTime}</i>
          </div>

          <div className="col-sm-12 description">
            <b>Topics:</b>
          </div>
        </div>
      </CardContent>

      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
