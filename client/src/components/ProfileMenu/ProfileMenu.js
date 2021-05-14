import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";
import "./ProfileMenu.css";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function ProfileMenu() {
  const history = useHistory();
  const [name, setName] = useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    console.log(sessionStorage.getItem("name"));
    setName(sessionStorage.getItem("name"));
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    console.log("log ouy");
    sessionStorage.clear();

    history.push({
      pathname: "/",
    });
  };

  const myAccount = () => {
    history.push({
      pathname: "/myAccount",
    });
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        className="profile-menu"
        onClick={handleClick}
      >
        <div>
          <Avatar
            alt={name}
            variant="square"
            src="/static/images/avatar/1.jpg"
            className="profile-avatar"
          ></Avatar>
        </div>
        &nbsp; &nbsp;
        <i class="fas fa-angle-down icon-down"></i>
      </Button>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem
          onClick={() => {
            myAccount();
          }}
        >
          <ListItemIcon>
            <i class="fas fa-user"></i>
          </ListItemIcon>
          <ListItemText primary="Account" />
        </StyledMenuItem>

        <StyledMenuItem
          onClick={() => {
            logOut();
          }}
        >
          <ListItemIcon>
            <i class="fas fa-sign-out-alt"></i>
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
