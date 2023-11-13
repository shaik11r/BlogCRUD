const blogController = require("../controllers/blogController");
const blogValidators = require("../validators/blogValidators");
const express = require("express");
const blogRouter = express.Router();

blogRouter.get("/", blogController.getAllBlogs);

blogRouter.post("/", blogValidators.validCreateBlog, blogValidators.handleValidationResult, blogController.createBlog);

blogRouter.delete(
  "/delete/:id",
  blogValidators.validDeleteBlog,
  blogValidators.handleValidationResult,
  blogController.deleteBlog
);

blogRouter.put("/put");

blogRouter.patch(
  "/:id",
  blogValidators.validateUpdateBlog,
  blogValidators.handleValidationResult,
  blogController.updateBlog
);

module.exports = blogRouter;
