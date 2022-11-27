const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    validate: /^$|^\d{10}$/
  },
  profileImage: String
});

const user = mongoose.model('User', userSchema);
module.exports = user;