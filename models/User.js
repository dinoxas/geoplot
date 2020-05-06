const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // _id is generated automatically by Mongo
  name: String,
  email: String,
  picture: String
});

// User collection and UserSchema schema
module.exports = mongoose.model('User', UserSchema);
