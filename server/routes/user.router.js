const express = require("express");
const router = express.Router();
const { check } = require("express-validator/check");
const users = require("../controllers/user.controller");

router.post(
  "/",
  [
    //BACKEND VALIDATIONS FOR USER INPUT, REDUX AUTOMATICALLY NOTIFIES USERS ON FRONTEND OF ISSUES
    check("first_name", "First name is required")
      .not()
      .isEmpty(),
    check("last_name", "Last name is required")
      .not()
      .isEmpty(),
    check("email", "Email must be valid").isEmail(),
    check("password", "Password must be longer than 8 characters")
      .isLength({ min: 8 })
      .not()
      .isEmpty()
  ],
  users.register
);

module.exports = router;
