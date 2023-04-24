const express = require("express");
const app = express();

app.get("/test", (req, res) => {
  res.send("Test endpoint working");
});

app.listen(8080, () => {
  console.log("Test server listening on port 8080");
});
