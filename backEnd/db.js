// Below mongoose is imported using require method.
const mongoose = require("mongoose");
// Below the uri is defined to make the connection to my database.
const uri =
  "mongodb+srv://Distractor7:camelCase@myDatabase.a0pn6wx.mongodb.net/?retryWrites=true&w=majority";
// Below the connection function is created and is passed the uri.
function connection() {
  mongoose.Promise = global.Promise;
  mongoose.connect(uri);

  // If mongoose cant connect to the database, these messages and steps below are executed.
  mongoose.connection.on("error", function () {
    console.log("Could not connect to the database. Exiting now...");
    process.exit();
  });

  // If the connection is found this message is logged.
  mongoose.connection.once("open", function () {
    console.log("Successfully connected to the database");
  });
}

// Connection is exported as a module.
module.exports = connection;
