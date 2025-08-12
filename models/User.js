const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  mobileno: String,
  email: { type: String, unique: true },
  password: String,
  preferences: {
    type: [String], // E.g., ["chocolate", "spicy", "vegetarian"]
    default: []
  }
});

module.exports = mongoose.model('User', userSchema);

