import { read, write } from "../utils/utils.js";
import * as uuid from "uuid";
import jwt from "jsonwebtoken";

const cars = read("cars");

const getCars = async (req, res) => {
  const getUserInfo = await jwt.verify(
    req.headers.token,
    process.env.SECRET_KEY
  );

  let getData = cars.filter((el) => {
    if (el.user_id === getUserInfo.id) {
      return el && delete el.id;
    }
  });

  return res.status(200).json(getData);
};

const getCarsOne = async (req, res) => {
  const { id } = req.params;

  const getUserInfo = await jwt.verify(
    req.headers.token,
    process.env.SECRET_KEY
  );

  const carsList = cars.filter((el) => el.user_id === getUserInfo.id);

  const foundedCar = carsList.find((el) => el.id === id);

  if (!foundedCar)
    return res.status(404).json({ message: "Car not found !!!." });

  // delete foundedFruit.id;
  res.status(200).json(foundedCar);
};

const createCar = async (req, res) => {
  const { name, color, price } = req.body;

  const getUserInfo = await jwt.verify(
    req.headers.token,
    process.env.SECRET_KEY
  );

  const newCar = {
    id: uuid.v4(),
    name,
    color,
    price,
    user_id: getUserInfo.id,
  };

  cars.push(newCar);

  write("cars", cars);
  return res.status(201).json({
    message: "Successfully Created.",
  });
};

const deleteCar = async (req, res) => {
  const { id } = req.params;
  const getUserInfo = await jwt.verify(
    req.headers.token,
    process.env.SECRET_KEY
  );

  const carsList = cars.filter((el) => el.user_id === getUserInfo.id);

  const foundedCar = carsList.find((el) => el.id === id);

  if (!foundedCar)
    return res.status(404).json({ message: "Car not found !!!." });

  cars.forEach((el, idx) => {
    if (el.id === id) {
      cars.splice(idx, 1);
    }
  });

  write("cars", cars);
  return res.status(200).json({ message: "Successfully Deleted." });
};

const updateCar = async (req, res) => {
  const { id } = req.params;
  const { name, color, price } = req.body;

  const getUserInfo = await jwt.verify(
    req.headers.token,
    process.env.SECRET_KEY
  );

  const carsList = cars.filter((el) => el.user_id === getUserInfo.id);

  const foundedCar = carsList.find((el) => el.id === id);

  if (!foundedCar)
    return res.status(404).json({ message: "Car not found !!!." });

  cars.forEach((el) => {
    if (el.id === id) {
      (el.name = name ? name : el.name),
        (el.color = color ? color : el.color),
        (el.price = price ? price : el.price);
    }
  });

  write("cars", cars);

  res.status(200).json({ message: "Successfully Updated !." });
};
export { getCars, getCarsOne, createCar, deleteCar, updateCar };
