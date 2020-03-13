const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const User = require("../../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const config = require("../../config/config");

router.post(
  "/",
  [
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
  async (req, res) => {
    const errors = validationResult(req);
    //DON'T CONTINUE IF ANY ERRORS OCCURED IN VALIDATION
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      first_name,
      last_name,
      email,
      password,
      is_teacher,
      code
    } = req.body;

    try {
      //CANT REGISTER EXISTING USER
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists!" }] });
      }

      //CREATE NEW INSTANCE OF USER
      user = new User({
        first_name,
        last_name,
        email,
        password,
        is_teacher,
        code
      });

      //SAVE USER ONCE PASSWORD HAS BEEN HASHED
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.DB_TOKEN || require("../../config/config").db.token,
        {
          expiresIn: 400000 //CHANGE EXPIRATION TO MUCH LESS IN PRODUCTION
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
