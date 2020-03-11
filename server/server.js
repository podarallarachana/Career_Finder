const express = require("./config/express.js");

// Use env port or default
const port = process.env.PORT || 5000;

const app = express.init();
app.listen(port, () => console.log(`Server now running on port ${port}!`));

// get routes
app.get("/", (req, res) => res.send("API works"));
app.use("/api/example", require("./routes/api/examples.server.routes.js"));
