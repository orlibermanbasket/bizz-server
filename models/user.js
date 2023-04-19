const { string } = require("joi");
const mongoose = require("mongoose");

// schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
  },
  email: {
    type: String,
    minlength: 6,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  isBuisness:{
    type: Boolean,
  }
});

// model
const User = mongoose.model("users", userSchema);
module.exports = User;