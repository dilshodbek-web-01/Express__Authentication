import express from "express";
import {
  getCars,
  getCarsOne,
  createCar,
  deleteCar,
  updateCar,
} from "../ctr/cars.ctr.js";

const router = express.Router();

router.get("/read", getCars);
router.post("/create", createCar);
router.get("/read/:id", getCarsOne);
router.delete("/delete/:id", deleteCar);
router.put("/update/:id", updateCar);

export default router;
