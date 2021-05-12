const users = [];

const addUser = ({ id, name, user }) => {
  name = name.trim().toLowerCase();
  user = user.trim().toLowerCase();

  // const existingUser = users.find((user1) => {
  //   console.log(user1);
  //   user1.user === user && user1.name === name;
  // });
  // console.log(existingUser);

  const combString = name + user;
  const combString1 = user + name;
  console.log(combString, combString1);

  const existingUser = users.find(
    (user1) => user1.user === combString || user1.user === combString1
  );
  console.log("Yes");
  console.log(existingUser);

  if (existingUser) {
    const user = existingUser.user;
    const userNew = { id, name, user };

    users.push(userNew);
    console.log(users);
    return { userNew };
  }
  user = combString;

  const userNew = { id, name, user };

  users.push(userNew);
  console.log(users);
  return { userNew };
};

const removeUser = (id) => {
  const index = users.findIndex((user1) => user1.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find((user1) => user1.id === id);

const getUsersInRoom = (user) => users.filter((user1) => user1.user === user);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
