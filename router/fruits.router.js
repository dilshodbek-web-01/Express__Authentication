import express from "express";
import {
  getFruits,
  getFruitsOne,
  createFruit,
  deleteFruit,
  updateFruit,
} from "../ctr/fruits.ctr.js";

const router = express.Router();

router.get("/read", getFruits);
router.post("/create", createFruit);
router.get("/read/:id", getFruitsOne);
router.delete("/delete/:id", deleteFruit);
router.put("/update/:id", updateFruit);

export default router;
