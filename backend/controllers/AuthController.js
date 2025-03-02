import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// new user signup
export const registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;
  const newUser = new UserModel(req.body);
  const { username } = req.body;

  try {
    const oldUser = await UserModel.findOne({ username });
    if (oldUser) return res.status(400).json({ message: "Username’s taken, dude" });

    const user = await newUser.save();
    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWTKEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ user, token });
    console.log("new user yay", username);
  } catch (error) {
    res.status(500).json({ message: "Signup crapped out: " + error.message });
  }
};

// login time
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (!user) return res.status(404).json("User’s gone missing");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json("Wrong password, try again");

    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWTKEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ user, token });
    console.log("logged in", username);
  } catch (err) {
    res.status(500).json("Login broke: " + err.message);
  }
};