const blogModel = require("../models/blogModel");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find();
    res.status(200).send({
      data: blogs,
    });
  } catch (error) {
    res.status(500).send({
      error: `Internal Server error`,
    });
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newBlog = await blogModel.create({ title, description });
    res.status(201).send({
      data: newBlog,
      message: "blog created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: "internal server error",
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    console.log(req.params.id);
    const param = req.params.id;
    const deletedBlog = await blogModel.findByIdAndDelete(param);
    if (!deletedBlog) {
      return res.status(404).send({ error: "blog not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, description } = req.body;
    const existingBlog = await blogModel.findById(blogId);

    if (!existingBlog) {
      return res.status(400).json({ error: "blog post not found" });
    }
    if (!title && !description) {
      return res.status(400).json({ error: "title or description cant be empty" });
    }
    existingBlog.title = title || existingBlog.title;
    existingBlog.description = description || existingBlog.description;
    const updatedBlog = await existingBlog.save();
    res.json(updatedBlog);
  } catch (error) {
    console.log("Error while updating blog post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
};
