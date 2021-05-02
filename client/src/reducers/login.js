const LoginReducer = (
  state = { username: "Unknown", loggedIn: false, communityName: null },
  action
) => {
  switch (action.type) {
    case "GETLOGIN":
      // eslint-disable-next-line no-param-reassign
      state = {
        username: action.text,
        loggedIn: action.status,
        communityName: action.group,
      };
      return state;
    default:
      return state;
  }
};

export default LoginReducer;
