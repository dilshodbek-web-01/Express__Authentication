import express from "express";
import { register, login } from "../ctr/auth.ctr.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);


export default router;
