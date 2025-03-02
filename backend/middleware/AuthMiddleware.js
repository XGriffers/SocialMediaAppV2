import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWTKEY; // secret sauce from .env

const authMiddleWare = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json("No token, no entry");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json("Token’s messed up");
    }

    console.log("token check:", token);
    const decoded = jwt.verify(token, secret);
    console.log("decoded junk:", decoded);
    req.body._id = decoded?.id; // stick user id here

    next(); // move along
  } catch (error) {
    console.log("auth blew up:", error.message);
    res.status(401).json("Bad token, try again");
  }
};

export default authMiddleWare;