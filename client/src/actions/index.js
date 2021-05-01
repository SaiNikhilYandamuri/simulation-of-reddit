// eslint-disable-next-line arrow-body-style
export const setUser = (username, loggedIn, groupName) => {
  return {
    type: "GETLOGIN",
    text: username,
    status: loggedIn,
    group: groupName,
  };
};

export default setUser;
