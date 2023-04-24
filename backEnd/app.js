//Below express is imported using require method. Cors is also imported from cross origin resource sharing.
const express = require("express");
const app = express();
const cors = require("cors");
// And the database connection file is imported to make use of the relevant database.
const connection = require("./db");

// The connection to the database is called.
connection();

// The express.json middle ware is use to parse information from the request body and make it available in the req.body property.
app.use(express.json());
// corse function that takes origin, methods and credentials as arguments.
app.use(
  cors({
    origin: "http://localhost:3000", //Front end port
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// The controllers functions are imported below.
const {
  addSingle,
  updateSingleByReg,
  updateManyCarsByOwner,
  findAll,
  deleteCar,
  listOlderThan5Years,
} = require("./controllers/carController");

//Post method and endpoint for addSingle controller function
app.post("/addCar", addSingle);

//Put method and endpoint for updateSingleCarByReg controller function
app.put("/updateCar", updateSingleByReg);

//Put method and endpoint for updateManyCarsByOwner controller function
app.put("/updateCars", updateManyCarsByOwner);

//Get method and endpoint for findAll controller function
app.get("/showCars", findAll);

//Delete method and endpoint for deleteCar controller function.
app.delete("/deleteCar/:registration", deleteCar);

// Get method and endpoint for listOlderThan5Years controller function.
app.get("/5YearOldCars", listOlderThan5Years);

// App is listening on port 8080.
app.listen(process.env.PORT || 8080, function () {
  console.log("Server started on port 8080");
});
