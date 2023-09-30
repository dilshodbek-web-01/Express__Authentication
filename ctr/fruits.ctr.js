import { read, write } from "../utils/utils.js";
import * as uuid from "uuid";
import jwt from "jsonwebtoken";

const fruits = read("fruits");

const getFruits = async (req, res) => {
  const getUserInfo = await jwt.verify(
    req.headers.token,
    process.env.SECRET_KEY
  );

  let getData = fruits.filter((el) => {
    if (el.user_id === getUserInfo.id) {
      return el && delete el.id;
    }
  });

  return res.status(200).json(getData);
};

const getFruitsOne = async (req, res) => {
  const { id } = req.params;

  const getUserInfo = await jwt.verify(
    req.headers.token,
    process.env.SECRET_KEY
  );

  const fruitsList = fruits.filter((el) => el.user_id === getUserInfo.id);

  const foundedFruit = fruitsList.find((el) => el.id === id);

  if (!foundedFruit)
    return res.status(404).json({ message: "Fruit not found !!!." });

  // delete foundedFruit.id;
  res.status(200).json(foundedFruit);
};

const createFruit = async (req, res) => {
  const { name, color, price } = req.body;

  const getUserInfo = await jwt.verify(
    req.headers.token,
    process.env.SECRET_KEY
  );

  const newFruit = {
    id: uuid.v4(),
    name,
    color,
    price,
    user_id: getUserInfo.id,
  };

  fruits.push(newFruit);

  write("fruits", fruits);
  return res.status(201).json({
    message: "Successfully Created.",
  });
};

const deleteFruit = async (req, res) => {
  const { id } = req.params;
  const getUserInfo = await jwt.verify(
    req.headers.token,
    process.env.SECRET_KEY
  );

  const fruitsList = fruits.filter((el) => el.user_id === getUserInfo.id);

  const foundedFruit = fruitsList.find((el) => el.id === id);

  if (!foundedFruit)
    return res.status(404).json({ message: "Fruit not found !!!." });

  fruits.forEach((el, idx) => {
    if (el.id === id) {
      fruits.splice(idx, 1);
    }
  });

  write("fruits", fruits);
  return res.status(200).json({ message: "Successfully Deleted." });
};

const updateFruit = async (req, res) => {
  const { id } = req.params;
  const { name, color, price } = req.body;

  const getUserInfo = await jwt.verify(
    req.headers.token,
    process.env.SECRET_KEY
  );

  const fruitsList = fruits.filter((el) => el.user_id === getUserInfo.id);

  const foundedFruit = fruitsList.find((el) => el.id === id);

  if (!foundedFruit)
    return res.status(404).json({ message: "Fruit not found !!!." });

  fruits.forEach((el) => {
    if (el.id === id) {
      (el.name = name ? name : el.name),
        (el.color = color ? color : el.color),
        (el.price = price ? price : el.price);
    }
  });

  write("fruits", fruits);

  res.status(200).json({ message: "Successfully Updated !." });
};
export { getFruits, getFruitsOne, createFruit, deleteFruit, updateFruit };
