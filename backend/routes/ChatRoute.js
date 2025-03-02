import express from "express";
import { createChat, findChat, userChats, deleteChat } from "../controllers/ChatController.js";

const router = express.Router();

// chat stuff
router.post("/", createChat); // start a chat
router.get("/:userId", userChats); // get user’s chats
router.get("/find/:firstId/:secondId", findChat); // find a chat
router.delete("/delete/:firstId/:secondId", deleteChat); // nuke a chat

export default router;