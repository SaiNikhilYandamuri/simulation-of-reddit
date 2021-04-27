var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('',{poolSize: 10}).then( () => { console.log("Mongoose is Connected") },
err => { console.log("Mongoose is Not Connected" + err) }
);