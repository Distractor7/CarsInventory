//Mongoose is imported using require.
const mongoose = require("mongoose");

// Below the car object schema is created for mongoose.
const carSchema = mongoose.Schema({
  make: { type: String, required: false },
  model: { type: Number, required: false },
  registration: { type: String, required: true },
  color: { type: String, required: false },
  owner: { type: String, required: true },
  address: { type: String, required: false },
});

// Below the variable Car stores the mongoose schema in it.
const Car = mongoose.model("car", carSchema);

// Car is exported as an empty schema.
module.exports = Car;
