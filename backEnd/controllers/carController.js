const Car = require("../models/carSchema");

// Create function controller.
// Below is an asynchronous functio that creates am object for a new car and stores it in a variable.
exports.addSingle = async function (req, res) {
  let carModel = await Car.create({
    make: req.body.make,
    model: parseInt(req.body.model),
    registration: req.body.registration,
    color: req.body.color,
    owner: req.body.owner,
    address: req.body.address,
  });
  console.log("Car model object: ", carModel);
  // If the carModel is empty then an error is logged and a response is returned.
  if (!carModel) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "An error occured while adding car to database." });
  } else {
    // Else if the carModel exists then a response with an OK status code of 200 is returned.
    return res.status(200).send(carModel);
  }
};

// Below is the findAll function that makes an asychronous request to find the cars in the database curently.
exports.findAll = async function (req, res) {
  // A try catch block retrieves the cars currently in the database and errors are handled by the catch block.
  try {
    const cars = await Car.find();
    res.send(cars);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Some error occurred while retrieving car inventory list.",
    });
  }
};

//Below is function that finds and updates one car by searching for its registration in the database.
exports.updateSingleByReg = async function (req, res) {
  // A variable query is created that sends the registration
  const query = {
    registration: req.body.registration,
  };
  // Below the objects used to store the new information is created.
  const update = {
    make: req.body.make,
    model: req.body.model,
    color: req.body.color,
    owner: req.body.owner,
    address: req.body.address,
  };
  // Below the findOneAndUpdate method is used with the query and update information as arguments.
  try {
    const doc = await Car.findOneAndUpdate(query, update, { new: true });

    // Below an if statement checks to see if the new car has been updated and the new object has been found.
    if (!doc) {
      console.log("Car not found.");
      res.status(404).send({ message: "Car not found." });
    } else {
      res.send("Updated");
    }
  } catch (err) {
    console.log("Something went wrong when updating data.");
    res.status(500).send({ message: "Unable to update car." });
  }
};

//Below is a function that can find multiple cars by searching for the owner name.
exports.updateManyCarsByOwner = async function (req, res) {
  // Owner name taken and stored in this variable below.
  const query = {
    owner: req.body.owner,
  };
  // The new updated information is stored in this object created below.
  const update = {
    make: req.body.make,
    model: req.body.model,
    color: req.body.color,
    owner: req.body.owner,
    address: req.body.address,
  };
  // Below a try catch block makes use of the updateMany method passing the query and update information as objects.
  try {
    const result = await Car.updateMany(query, update);

    // Below is an if statement that checks to see how many cars were updated and sends specific responses based on answer.
    if (result.nModified === 0) {
      console.log("No cars were updated.");
      res.status(404).send({ message: "No cars were updated." });
    } else {
      res.send("Updated " + result.nModified + " cars.");
    }
  } catch (err) {
    console.log("Something went wrong when updating data.");
    res.status(500).send({ message: "Unable to update cars." });
  }
};

// Below is a delete car asynchronous function that takes the registratio of a car entered, searches for it and then deletes i using the deleteOne method.
exports.deleteCar = async function (req, res) {
  const query = { registration: req.params.registration };

  // Below a try catch block makes the deleteOne request using the query variable to find the existing car in the database.
  try {
    const result = await Car.deleteOne(query);

    // Below if the deletedCound of the result is 0 then no car has been deleted.
    if (result.deletedCount === 0) {
      console.log("Car not found.");
      res.status(404).send({ message: "Car not found." });
      // Else car has been deleted.
    } else {
      res.send("Car deleted.");
    }
  } catch (err) {
    console.log("Something went wrong when deleting data.");
    res.status(500).send({ message: "Unable to delete car." });
  }
};

// Below a function is created to find all cars over the age of 5 years old.
exports.listOlderThan5Years = async function (req, res) {
  // The current year is calculated using the variables below.
  const currentYear = new Date().getFullYear();
  const cutoffYear = currentYear - 5;

  // The query variable below defines an objects to retrieve all the cars with a model year value less that the cutOffYear.
  const query = { model: { $lt: cutoffYear } };
  //Defines the fields that should be returned from the database for each matching car object.
  const projection = {
    make: 1,
    model: 1,
    registration: 1,
    owner: 1,
    _id: 0,
  };

  // Below is a try catch block that makes a selective query search to find the cars older than 5 years and then returns the results.
  try {
    const cars = await Car.find(query).select(projection).exec();
    res.send(cars);
  } catch (err) {
    console.log("Something went wrong when retrieving data.");
    res.status(500).send({ message: "Unable to retrieve cars." });
  }
};
