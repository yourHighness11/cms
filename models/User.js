const { Schema, model, models } = require("mongoose");

const UserSchema = new Schema({
  mobile: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 10,
    maxlength: 15,
    validate: [(value) => value.match(/^\d+$/, "Invalid mobile number")],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    minlength: 8,
    validate: [
      (value) => value.match(/^\S+@\S+\.\S+$/, "Invalid email address"),
    ],
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  token: {
    type: String,
    required: true,
  },
});

module.exports = models.User || model("User", UserSchema);
