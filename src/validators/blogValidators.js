const { body, param, validationResult } = require("express-validator");
const validBlogId = param("id").isMongoId().withMessage("Invalid post Id");

const validCreateBlog = [
  body("title")
    .trim()
    .isLength({ min: 10 })
    .withMessage("title is must be atleast 3 words")
    .isLength({ max: 2040 })
    .withMessage("title must be less than 100 words")
    .isString()
    .withMessage("title should be string"),
  body("description")
    .trim()
    .isString()
    .withMessage("Description is required")
    .isLength({ min: 300 })
    .withMessage("Description should be 100 words")
    .isLength({ max: 2040 })
    .withMessage("Description should be  less than 500 words"),
];
const validDeleteBlog = [validBlogId];

const validateUpdateBlog = [
  body("title")
    .optional({ nullable: true })
    .trim()
    .isLength({ min: 10 })
    .withMessage("title must be atleast 10chars")
    .isLength({ max: 2040 })
    .withMessage("title must be less than 2040 chars")
    .isString()
    .withMessage("title must be a String"),
  body("description")
    .optional({ nullable: true })
    .trim()
    .isLength({ min: 10 })
    .withMessage("description must be atleast 10chars")
    .isLength({ max: 2040 })
    .withMessage("description must be less than 2040 chars")
    .isString()
    .withMessage("description must be a String"),
];

const handleValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };

module.exports = {
  validBlogId,
  validCreateBlog,
  validDeleteBlog,
  validateUpdateBlog,
  handleValidationResult,
};
