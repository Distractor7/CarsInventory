//Bekiw are the imports for react, axios, json and hooks.
import React from "react";
import { useState } from "react";
import axios from "axios";

//CarsInterface component.
function CarsInterface(props) {
  //Empty object initialised for car being handled in the input form at the moment.
  const [carObject, setCarObject] = useState({
    make: "",
    model: "",
    registration: "",
    color: "",
    owner: "",
    address: "",
  });

  // Below is the variable and set function that stores an empty array to store all added cars in.
  const [carList, setCarList] = useState([]);

  //Below is function for updating the carObject from the form.
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCarObject({ ...carObject, [name]: value });
  };

  // Below is the asyncronous function that is used to make an axios request to to the backend controllers.
  const addCar = async (event) => {
    event.preventDefault();
    // A try block makes axios post request with the current carObject.
    try {
      await axios.post("http://localhost:8080/addCar", carObject);
      alert("Car added successfully");
      // The catch block logs if an error has occured during the request.
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  // Below is the asyncronous function that is used to make a delete request to the back end..
  const deleteCar = async (event) => {
    event.preventDefault();
    try {
      const registration = carObject.registration;
      await axios.delete(`http://localhost:8080/deleteCar/${registration}`);
      alert("Car deleted successfully");
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  // Below is the asynchronous function used to retrieve the current cars in the database by using the endpoint /showCars, which is connected to the relevant controller.
  const fetchCars = async () => {
    // A try block makes and axios get request from an endpoint in the back end to set the carList with the data from the response.
    try {
      const response = await axios.get("http://localhost:8080/showCars");
      setCarList(response.data);
      console.log(carList);
      // Catch block handles the errors that occur during function.
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // Below is the function that makes a put request to the backend route to udpdate an existing car in the databases information.
  const updateCar = async (carObject) => {
    // A try block makes an axios put request to an endpoint in the backend. It finds the searched for car and then updates with the new information.
    try {
      await axios.put(`http://localhost:8080/updateCar`, carObject);
      alert("Car updated successfully");
      // Catch block handles the errors that occur during function.
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  // Below is the function that handles updating the car in the database with the current carObject that has now been set by the new request to update a car.
  const handleUpdateCar = async (event) => {
    event.preventDefault();
    // Below we await the updating of new car to finish.
    try {
      await updateCar(carObject);
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  // Below is the function that makes a put request to the backend route to udpdate existing cars in the databases information.
  const updateManyCars = async (carObject) => {
    try {
      await axios.put(`http://localhost:8080/updateCars`, carObject);
      alert("Cars updated successfully");
      // Catch block handles the errors that occur during function.
    } catch (error) {
      console.error("Error updating cars:", error);
    }
  };

  // Below is the function that handles updating more than one car in the database car.
  const handleUpdateManyCars = async (event) => {
    event.preventDefault();
    // The try block calls the updateManyCars function passing it the new information for the cars.
    try {
      await updateManyCars(carObject);
      // Catch block handles the errors that occur during function.
    } catch (error) {
      console.error("Error updating cars:", error);
    }
  };

  // Below is the function to find cars that are older than 5 years. It makes an axios get request from the back end and sets carList to response.data.
  const fetchOlderCars = async () => {
    try {
      const response = await axios.get("http://localhost:8080/5YearOldCars");
      setCarList(response.data);
      console.log(carList);
    } catch (error) {
      console.error("Error fetching older cars:", error);
    }
  };

  // Below is the jsx that renderes the UI to the user.
  return (
    <div>
      <h1 className="carsHeading">Cars Inventory</h1>

      {/* Below is the form that is used to take information about new cars or to edit or delete certain information about currently existing cars in the database. */}
      {/* The form takes addCar as an onSubmit function. */}
      <form onSubmit={addCar} className="form">
        <label htmlFor="make">Make:</label>
        {/* Input for car make */}
        <input
          name="make"
          value={carObject.make}
          onChange={handleInputChange}
        />

        <label htmlFor="model">Model:</label>
        {/* Input for car model */}
        <input
          name="model"
          value={carObject.model}
          onChange={handleInputChange}
        />

        <label htmlFor="registration">Registration:</label>
        {/* Input for car registration */}
        <input
          name="registration"
          value={carObject.registration}
          onChange={handleInputChange}
        />

        <label htmlFor="color">Color:</label>
        {/* Input for car color*/}
        <input
          name="color"
          value={carObject.color}
          onChange={handleInputChange}
        />

        {/* Input for car owner */}
        <label htmlFor="owner">Owner:</label>
        <input
          name="owner"
          value={carObject.owner}
          onChange={handleInputChange}
        />

        {/* Input for car address */}
        <label htmlFor="address">Address:</label>
        <input
          name="address"
          value={carObject.address}
          onChange={handleInputChange}
        />

        {/* Below are the buttons used to call functions that make particular axios requests to the back end controller functions that manipulate the database. */}
        <button onClick={addCar} className="submitButtons" type="submit">
          Add Car
        </button>
        {/* handleUpdateCar is passed as onClick function to the button. */}
        <button
          onClick={handleUpdateCar}
          className="submitButtons"
          type="button"
        >
          Update Car
        </button>
        {/* handleUpdateManyCars is passed as onClick function to the button. */}
        <button
          onClick={handleUpdateManyCars}
          className="submitButtons"
          type="button"
        >
          Update Cars
        </button>
        {/* delete car is passed as onClick function to the button. */}
        <button onClick={deleteCar} className="submitButtons">
          Delete Car
        </button>
      </form>

      {/* fetchCars is passed as onClick function to the button. */}
      <button onClick={fetchCars} className="button">
        Show Cars
      </button>
      {/* fetchOlderCars is passed as onClick function to the button. */}
      <button onClick={fetchOlderCars} className="button">
        Show 5+ years old cars
      </button>
      {/* Below is the div that displays the current cars in the database. By mapping over a local array variable that has been updated with the database cars. */}
      <div className="inventoryDisplay">
        {/* Car list is mapped over and each car is displayed with particular properties. */}
        {carList.map((car) => (
          <div key={car._id} className="car-details">
            <span>Make: {car.make}</span>
            <span>Model: {car.model}</span>
            <span>Registration: {car.registration}</span>
            <span>Owner: {car.owner}</span>
            <span>Address: {car.address}</span>
            <span>Color: {car.color}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// CarsInterface Component is exported.
export default CarsInterface;
