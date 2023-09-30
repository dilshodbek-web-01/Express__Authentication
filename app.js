import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

// routes
import register from "./router/auth.router.js";
import login from "./router/auth.router.js";
import usersRouter from "./router/users.router.js";
import fruitsRouter from "./router/fruits.router.js";
import carsRouter from "./router/cars.router.js";
import animalsRouter from "./router/animals.router.js";

const port = process.env.PORT || 7777;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", register);
app.use("/users", login);
app.use("/users", usersRouter);
app.use("/fruits", fruitsRouter);
app.use("/cars", carsRouter);
app.use("/animals", animalsRouter);

app.use("/*", (req, res) => {
  res.json({ message: "NOT FOUND !!!." });
});

app.listen(port, () => console.log(port));
