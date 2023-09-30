import { read, write } from "../utils/utils.js";
import * as uuid from "uuid";
import jwt from "jsonwebtoken";

const animals = read("animals");

const getAnimals = async (req, res) => {
  const getUserInfo = await jwt.verify(
    req.headers.token,
    process.env.SECRET_KEY
  );

  let getData = animals.filter((el) => {
    if (el.user_id === getUserInfo.id) {
      return el && delete el.id;
    }
  });

  return res.status(200).json(getData);
};

const getAnimalsOne = async (req, res) => {
  const { id } = req.params;

  const getUserInfo = await jwt.verify(
    req.headers.token,
    process.env.SECRET_KEY
  );

  const animalsList = animals.filter((el) => el.user_id === getUserInfo.id);

  const foundedAnimal = animalsList.find((el) => el.id === id);

  if (!foundedAnimal)
    return res.status(404).json({ message: "Animal not found !!!." });

  // delete foundedFruit.id;
  res.status(200).json(foundedAnimal);
};

const createAnimal = async (req, res) => {
  const { name, type, color } = req.body;

  const getUserInfo = await jwt.verify(
    req.headers.token,
    process.env.SECRET_KEY
  );

  const newAnimal = {
    id: uuid.v4(),
    name,
    type,
    color,
    user_id: getUserInfo.id,
  };

  animals.push(newAnimal);

  write("animals", animals);
  return res.status(201).json({
    message: "Successfully Created.",
  });
};

const deleteAnimal = async (req, res) => {
  const { id } = req.params;
  const getUserInfo = await jwt.verify(
    req.headers.token,
    process.env.SECRET_KEY
  );

  const animalsList = animals.filter((el) => el.user_id === getUserInfo.id);

  const foundedAnimal = animalsList.find((el) => el.id === id);

  if (!foundedAnimal)
    return res.status(404).json({ message: "Animal not found !!!." });

  animals.forEach((el, idx) => {
    if (el.id === id) {
      animals.splice(idx, 1);
    }
  });

  write("animals", animals);
  return res.status(200).json({ message: "Successfully Deleted." });
};

const updateAnimal = async (req, res) => {
  const { id } = req.params;
  const { name, type, color } = req.body;

  const getUserInfo = await jwt.verify(
    req.headers.token,
    process.env.SECRET_KEY
  );

  const animalsList = animals.filter((el) => el.user_id === getUserInfo.id);

  const foundedAnimal = animalsList.find((el) => el.id === id);

  if (!foundedAnimal)
    return res.status(404).json({ message: "Animal not found !!!." });

  animals.forEach((el) => {
    if (el.id === id) {
      (el.name = name ? name : el.name),
        (el.type = type ? type : el.type),
        (el.color = color ? color : el.color);
    }
  });

  write("animals", animals);

  res.status(200).json({ message: "Successfully Updated" });
};
export { getAnimals, getAnimalsOne, createAnimal, deleteAnimal, updateAnimal };
