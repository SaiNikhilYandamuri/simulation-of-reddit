import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./AboutCommunity.css";

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
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

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
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
