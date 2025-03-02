import express from "express";
import { addMessage, getMessages } from "../controllers/MessageController.js";

const router = express.Router();

// msg routes
router.post("/", addMessage); // send a msg
router.get("/:chatId", getMessages); // grab msgs

export default router;