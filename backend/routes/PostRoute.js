import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getTimelinePosts,
  likePost,
  dislikePost,
  updatePost,
} from "../controllers/PostController.js";
import authMiddleWare from "../middleware/AuthMiddleware.js";

const router = express.Router();

// post routes
router.post("/", authMiddleWare, createPost); // new post
router.get("/:id", getPost); // grab a post
router.put("/:id", authMiddleWare, updatePost); // tweak a post
router.delete("/:id", authMiddleWare, deletePost); // kill a post
router.put("/:id/like", authMiddleWare, likePost); // like it
router.put("/:id/dislike", authMiddleWare, dislikePost); // nah it
router.get("/:id/timeline", getTimelinePosts); // timeline

export default router;