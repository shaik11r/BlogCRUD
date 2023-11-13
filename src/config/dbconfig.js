const mongoose = require("mongoose");
require("dotenv").config();

const ConnectToDb = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log("connected to DataBase");
  } catch (error) {
    console.log(error);
  }
};
module.exports = ConnectToDb;
