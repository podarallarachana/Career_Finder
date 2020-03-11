const express = require("express");
const router = express.Router();
const authorization = require("../../middleware/authorization");

//GETS USER DATA IF TOKEN IS VALID
router.get("/", authorization, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
