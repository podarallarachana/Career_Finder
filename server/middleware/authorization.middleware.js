const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  // GET TOKEN FROM HEADER
  const token = req.header("x-auth-token");

  //TOKE IS NOT AVAILABLE
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // CHECK IF TOKEN IS VALID
  try {
    jwt.verify(
      token,
      process.env.DB_TOKEN || require("../config/config").db.token,
      (error, decoded) => {
        if (error) {
          res.status(401).json({ msg: "Token is not valid" });
        } else {
          req.user = decoded.user;
          next();
        }
      }
    );
  } catch (err) {
    console.error("Authorization Middleware Error");
    res.status(500).json({ msg: "Server Error" });
  }
};
