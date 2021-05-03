const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.gnqvc.mongodb.net/Reddit?retryWrites=true&w=majority",
    {
      poolSize: 500,
    }
  )
  .then(
    () => {
      console.log("Mongoose is connected");
    },
    (err) => {
      console.log("Mongoose is not connected" + err);
    }
  );

module.exports = mongoose;