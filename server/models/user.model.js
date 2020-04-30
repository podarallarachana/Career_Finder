const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  is_teacher: {
    type: Boolean,
    required: true
  },
  code: {
    type: String,
    required: true //DEFAULT NULL?
  }
});

module.exports = User = mongoose.model("user", UserSchema);
