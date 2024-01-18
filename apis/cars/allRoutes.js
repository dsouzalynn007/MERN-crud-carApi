import { Router } from "express";
import {
    getAll,
    createCar,
    updateCar,
    getCar,
    deleteCar,
    search
  } from "./carsController.js";

let carRoute = Router()
carRoute.get("/getAll", getAll)
carRoute.get("/getCar/:carId", getCar);
carRoute.post("/createCar", createCar)
carRoute.put("/update/:carId", updateCar);
carRoute.delete("/delete/:carId", deleteCar);
carRoute.get("/search", search);

export default carRoute