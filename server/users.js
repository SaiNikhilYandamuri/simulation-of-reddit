const users = [];

const addUser = ({ id, name, user }) => {
  name = name.trim().toLowerCase();
  user = user.trim().toLowerCase();

  const existingUser = users.find(
    (user1) => user1.user === user && user1.name === name
  );

  if (existingUser) {
    return { error: "Chat already is on!!!!" };
  }

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
