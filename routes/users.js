const express = require("express");
router = express.Router();
const { body } = require("express-validator");
const {
  register,
  login
} = require("../controllers/users");

const {
  questionPost,
  answer
} = require("../controllers/dashboard");

const { validateUserToken } = require("../lib/ath");

// route for authentication
router.post(
  "/register",
  body("fullname", "Name is required").trim(),
  body("email").isEmail().normalizeEmail(),
  body("password", "Password must be of  8 characters long and alphanumeric")
    .trim()
    .isLength({ min: 8 })
    .isAlphanumeric(),
  register
);

router.post("/login", login);

//routes for dashboard
router.post("/question", validateUserToken, questionPost);
router.post("/answer", validateUserToken, answer);

module.exports = router;
