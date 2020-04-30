const User = require("../models/user.model");
const Class = require("../models/class.model")
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

//upon teacher delete
exports.deleteTeacher = async (req,res) => {
  console.log("hit");
  try{
    await Class.deleteMany({ofTeacherId: req.body.id});
    await User.deleteOne({_id: req.body.id});
    res.status(200).send("Deleted");
  } catch (err) {
    res.status(400).send("Error");
  }
};