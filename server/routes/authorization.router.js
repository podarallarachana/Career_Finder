const express = require("express");
const router = express.Router();
const authorization = require("../middleware/authorization.middleware");
const { check } = require("express-validator");
const authentication = require("../controllers/authorization.controller");

//GETS USER DATA IF TOKEN IS VALID
router.get("/", authorization, authentication.fetchUserData);

//USER LOGIN
router.post(
  "/",
  [
    check("email", "Email must be valid").isEmail(),
    check("password", "Password is required").exists()
  ],
  authentication.loginUser
);

module.exports = router;
