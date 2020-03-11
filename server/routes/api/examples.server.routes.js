const examples = require("../../controllers/examples.server.controller.js"),
  express = require("express"),
  router = express.Router();

router.get("/", (req, res) => res.send("Example route"));

module.exports = router;
