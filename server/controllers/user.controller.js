const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator/check");

//NEW USER REGISTRATION
exports.register = async (req, res) => {
  const errors = validationResult(req);
  //DON'T CONTINUE IF ANY ERRORS OCCURED IN VALIDATION
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { first_name, last_name, email, password, is_teacher, code } = req.body;

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
      code,
      points: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
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
      process.env.DB_TOKEN || require("../config/config").db.token,
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
};
