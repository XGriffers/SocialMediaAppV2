import express from "express";
import multer from "multer";
import authMiddleWare from "../middleware/AuthMiddleware.js";

const router = express.Router();

// file upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images"); // dump pics here
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name); // name it
  },
});
const upload = multer({ storage: storage });

// upload route
router.post("/", authMiddleWare, upload.single("file"), (req, res) => {
  try {
    res.status(200).json("File uploaded, nice");
  } catch (error) {
    console.error("Upload flopped:", error);
    res.status(500).json("Upload broke");
  }
});

export default router;