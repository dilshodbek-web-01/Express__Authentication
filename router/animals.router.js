import express from "express";
import {
  getAnimals,
  getAnimalsOne,
  createAnimal,
  deleteAnimal,
  updateAnimal,
} from "../ctr/animals.ctr.js";

const router = express.Router();

router.get("/read", getAnimals);
router.post("/create", createAnimal);
router.get("/read/:id", getAnimalsOne);
router.delete("/delete/:id", deleteAnimal);
router.put("/update/:id", updateAnimal);

// router.route("/list").get(getAnimals).post(createAnimal);

// router
//   .route("/list/:id")
//   .get(getAnimalsOne)
//   .delete(deleteAnimal)
//   .put(updateAnimal);

export default router;
