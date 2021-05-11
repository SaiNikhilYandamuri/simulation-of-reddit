import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import NavBar from "../NavBar/NavBar";
import "./MyAccount.css";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import mainLogo from "../resources/placeholder.PNG";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Axios from "axios";
import endPointObj from "../../endPointUrl";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";

const useStylesDropDown = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const useStylesForm = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "32vw",
    },
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const useStylesProfile = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(25),
    height: theme.spacing(25),
  },
}));

export default function CenteredGrid() {
  const email = useSelector((state) => state.login.username);
  const [gender, setGender] = React.useState("");
  const classes = useStyles();
  const profileClasses = useStylesProfile();
  const formStyles = useStylesForm();
  const [name, setName] = React.useState("");
  const [emailState, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [topics, setTopics] = React.useState([]);
  const [file, setFile] = React.useState("");
  const [url, setURL] = React.useState(mainLogo);

  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };

  const updateAccountDetails = (
    email,
    name,
    password,
    gender,
    location,
    description,
    file
  ) => {
    return new Promise((resolve, reject) => {
      Axios.post(
        endPointObj.url + "api/updateProfile",
        {
          email,
          name,
          password,
          gender,
          location,
          description,
          file,
        },
        {
          headers: {
            Authorization: "jwt " + sessionStorage.getItem("token"),
          },
        }
      ).then((response) => {
        getAccountDetails().then((result) => {
          setEmail(result.data.email);
          setURL(result.data[0].profile_picture);

          setName(result.data[0].name);
          setLocation(result.data[0].location);
          setGender(result.data[0].gender);
          setDescription(result.data[0].description);
        });

        if (file) {
          fileUpload(file);
        }

        resolve(response);
      });
    });
  };

  useEffect(() => {
    getAccountDetails().then((result) => {
      setEmail(result.data.email);
      if (result.data[0].profile_picture) {
        setURL(result.data[0].profile_picture);
      }

      setName(result.data[0].name);
      setLocation(result.data[0].location);
      setGender(result.data[0].gender);
      setDescription(result.data[0].description);
    });

    // return () => {
    //   console.log("cleaned up");
    //   updateAccountDetails(
    //     email,
    //     name,
    //     password,
    //     gender,
    //     location,
    //     description
    //   ).then((result) => {
    //     console.log("successfully updated account details");
    //   });
    // };
  }, []);

  const changeNameHandler = (e) => {
    setName(e.target.value);
  };

  const changePasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const changeDescriptionHandler = (e) => {
    setDescription(e.target.value);
  };

  const changeTopicsHandler = () => {};

  const getAccountDetails = () => {
    return new Promise((resolve, reject) => {
      Axios.post(
        endPointObj.url + "api/getProfile",
        {
          email,
        },
        {
          headers: {
            Authorization: "jwt " + sessionStorage.getItem("token"),
          },
        }
      ).then((response) => {
        resolve(response);
      });
    });
  };

  const locationChangeHandler = (e) => {
    setLocation(e.target.value);
  };

  function fileChangehandler(event) {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    setURL(URL.createObjectURL(event.target.files[0]));
  }

  function fileUpload(file) {
    const data = new FormData();
    data.append("name", "file_name.jpg");
    console.log(file);
    data.append("file", file);
    console.log(data.file);

    Axios.post(endPointObj.url + "api/uploadImage/" + email, data)
      .then((res) => {})
      .catch((err) => {
        getAccountDetails().then((result) => {
          setEmail(result.data.email);
          setURL(result.data[0].profile_picture);

          setName(result.data[0].name);
          setLocation(result.data[0].location);
          setGender(result.data[0].gender);
          setDescription(result.data[0].description);
        });

        console.log(err);
      });
  }

  const updateProfile = (
    email,
    name,
    password,
    gender,
    location,
    description,
    file
  ) => {
    updateAccountDetails(
      email,
      name,
      password,
      gender,
      location,
      description,
      file
    );
  };

  return (
    <div className="myaccount-bg">
      <div className={classes.root}>
        <NavBar></NavBar>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <div className="myaccount-parent">
              <div className="myaccount-blue"></div>
              <div className="myaccount-white">
                <div className="myaccount-form-div">
                  <Grid container spacing={0}>
                    <Grid item xs={6}>
                      <form
                        className={formStyles.root}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="standard-basic"
                          label="Name"
                          value={name}
                          onChange={(e) => changeNameHandler(e.target.value)}
                        />
                      </form>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl>
                        <InputLabel
                          id="demo-simple-select-label"
                          className="gender-label"
                        >
                          Gender
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          className="input-gender-width"
                          id="demo-simple-select"
                          value={gender}
                          onChange={(e) => handleChangeGender(e)}
                        >
                          <MenuItem value={"m"}>Male</MenuItem>
                          <MenuItem value={"f"}>Female</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <form
                        className={formStyles.root}
                        noValidate
                        autoComplete="off"
                        onChange={(e) => {
                          locationChangeHandler(e);
                        }}
                      >
                        <TextField
                          value={location}
                          id="standard-basic"
                          label="location"
                        />
                      </form>
                    </Grid>
                    <Grid item xs={6}>
                      <form
                        className={formStyles.root}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="standard-basic"
                          label="password"
                          onChange={(e) => changePasswordHandler(e)}
                        />
                      </form>
                    </Grid>
                    <Grid item xs={6}>
                      <form
                        className={formStyles.root}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          value={description}
                          id="standard-basic"
                          label="description"
                          onChange={(e) => changeDescriptionHandler(e)}
                        />
                      </form>
                    </Grid>
                    <Grid item xs={6}>
                      <form
                        className={formStyles.root}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="standard-basic"
                          label="topics"
                          onChange={(e) => changeTopicsHandler(e)}
                        />
                      </form>
                    </Grid>

                    <Grid item xs={6}></Grid>
                    <Grid item xs={6} className="upload-button">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          updateProfile(
                            email,
                            name,
                            password,
                            gender,
                            location,
                            description,
                            file
                          );
                        }}
                      >
                        Update Profile
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </div>
              <div className="profile-image">
                <Avatar
                  variant="square"
                  alt="Remy Sharp"
                  className={profileClasses.large}
                  src={url}
                />
                <div className="profile-edit-button">
                  <label for="file">
                    <i class="fas fa-pen-square fa-lg " />
                  </label>
                  <input
                    className="hide-button"
                    type="file"
                    id="file"
                    accept=".jpg"
                    onChange={(e) => fileChangehandler(e)}
                  />
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
