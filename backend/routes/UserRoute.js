import express from "express";
import {
  deleteUser,
  followUser,
  getAllUsers,
  getUser,
  unfollowUser,
  updateUser,
} from "../controllers/UserController.js";
import authMiddleWare from "../middleware/AuthMiddleware.js";

const router = express.Router();

// user routes
router.get("/:id", getUser); // peek at a user
router.get("/", getAllUsers); // all the peeps
router.put("/:id", authMiddleWare, updateUser); // tweak yourself
router.delete("/:id", authMiddleWare, deleteUser); // bye bye
router.put("/:id/follow", authMiddleWare, followUser); // stalk
router.put("/:id/unfollow", authMiddleWare, unfollowUser); // ditch

export default router;