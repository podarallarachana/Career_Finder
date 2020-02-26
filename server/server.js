const express = require("./config/express.js");

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Use env port or default
const port = process.env.PORT || 5000;

const app = express.init();
app.listen(port, () => console.log(`Server now running on port ${port}!`));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
