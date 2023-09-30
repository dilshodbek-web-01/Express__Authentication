import express from "express";
import {
  getCourses,
  getCourseOne,
  createCourse,
  deleteCourse,
  updateCourse,
} from "../ctr/users.ctr.js";

const router = express.Router();

router.get("/read", getCourses);
router.post("/create", createCourse);
router.get("/read/:id", getCourseOne);
router.delete("/delete/:id", deleteCourse);
router.put("/update/:id", updateCourse);

export default router;
