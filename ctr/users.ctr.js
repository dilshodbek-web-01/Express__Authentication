import { read, write } from "../utils/utils.js";
import * as uuid from "uuid";
import jwt from "jsonwebtoken";

const courses = read("courses");

const getCourses = async (req, res) => {
  const getUserInfo = await jwt.verify(
    req.headers.token,
    process.env.SECRET_KEY
  );

  let getData = courses.filter((el) => {
    if (el.user_id === getUserInfo.id) {
      return el && delete el.id;
    }
  });

  return res.status(200).json(getData);
};

const getCourseOne = async (req, res) => {
  const { id } = req.params;

  const getUserInfo = await jwt.verify(
    req.headers.token,
    process.env.SECRET_KEY
  );

  const courseList = courses.filter((el) => el.user_id === getUserInfo.id);

  const foundedCourse = courseList.find((el) => el.id === id);

  if (!foundedCourse)
    return res.status(404).json({ message: "Course not found !!!." });

  // delete foundedCourse.id;
  return res.status(200).json(foundedCourse);
};

const createCourse = async (req, res) => {
  const { title, price } = req.body;

  const getUserInfo = await jwt.verify(
    req.headers.token,
    process.env.SECRET_KEY
  );

  const newCourse = {
    id: uuid.v4(),
    title,
    price,
    user_id: getUserInfo.id,
  };

  courses.push(newCourse);

  write("courses", courses);
  return res.status(201).json({
    message: "Successfully Created.",
  });
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;
  const getUserInfo = await jwt.verify(
    req.headers.token,
    process.env.SECRET_KEY
  );

  const courseList = courses.filter((el) => el.user_id === getUserInfo.id);

  const foundedCourse = courseList.find((el) => el.id === id);

  if (!foundedCourse)
    return res.status(404).json({ message: "Course not found !!!." });

  courses.forEach((el, idx) => {
    if (el.id === id) {
      courses.splice(idx, 1);
    }
  });

  write("courses", courses);
  return res.status(200).json({ message: "Successfully Deleted." });
};

const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, price } = req.body;

  const getUserInfo = await jwt.verify(
    req.headers.token,
    process.env.SECRET_KEY
  );

  const courseList = courses.filter((el) => el.user_id === getUserInfo.id);

  const foundedCourse = courseList.find((el) => el.id === id);

  if (!foundedCourse)
    return res.status(404).json({ message: "Course not found !!!." });

  courses.forEach((el) => {
    if (el.id === id) {
      (el.title = title ? title : el.title),
        (el.price = price ? price : el.price);
    }
  });

  write("courses", courses);

  res.status(200).json({ message: "Successfully Updated !." });
};
export { getCourses, getCourseOne, createCourse, deleteCourse, updateCourse };
