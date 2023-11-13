const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdBlogs: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "blogModel" }],
    default: [],
  },
});
const userModel = new mongoose.Model("User", userSchema);
module.exports = userModel;
