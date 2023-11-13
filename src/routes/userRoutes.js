const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const isUserAuthorized = require("../middlewares/authMiddleware");
userRouter.post("/signup", userController.signup);
userRouter.post("/signin", userController.signin);
userRouter.get("/user", isUserAuthorized, userController.userDetails);

module.exports = userRouter;
