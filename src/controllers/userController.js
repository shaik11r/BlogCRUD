const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
require("dotenv").config();
const ms = require("ms");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await userModel.findOne({ email: email });
  if (existingUser) {
    return res.status(400).json({
      error: "ERROR Email is already exists",
    });
  }
  const existingUsername = await userModel.findOne({ username: username });
  if (existingUsername) {
    return res.status(400).json({
      error: "username already taken",
    });
  }
  const hashPassword = bcrypt.hashSync(password, 10);
  const newUser = new userModel({
    username: username,
    email: email,
    password: hashPassword,
  });
  await newUser.save();
  res.status(200).json({
    message: "user created",
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await userModel.findOne({ email: email }).exec();
  if (!existingUser) {
    return res.status(400).json({
      error: "User not found",
    });
  }
  const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      error: "ERROR invalid password",
    });
  }
  const token = jwt.sign(
    {
      userid: existingUser._id,
      email: existingUser.email,
    },
    process.env.SECRET,
    { expiresIn: "3h" }
  );
  res.set("token", token);
  res.json({
    message: "sign in successfull",
  });
};

const userDetails = async (req, res) => {
  try {
    const { userId, email } = req.currentUser;
    const userprofile = await userModel.findOne({ email: email });
    if (!userprofile) {
      return res.status(404).json({ error: "user not found " });
    }
    res.json({
      userId: userprofile._id,
      username: userprofile.username,
      email: userprofile.email,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  signin,
  signup,
  userDetails,
};
