import express from "express";
import { loginUser, registerUser } from "../controllers/AuthController.js";

const router = express.Router();

// signup and login routes
router.post("/register", registerUser); // new user
router.post("/login", loginUser); // get in

export default router;