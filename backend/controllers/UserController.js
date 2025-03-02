import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// grab a user
export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No user here");
    }
  } catch (error) {
    res.status(500).json("Fetch flopped: " + error.message);
  }
};

// all users
export const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find();
    users = users.map((user) => {
      const { password, ...otherDetails } = user._doc;
      return otherDetails;
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json("Users fetch died: " + error.message);
  }
};

// update user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, password } = req.body;

  if (id === _id) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWTKEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({ user, token });
      console.log("user updated", user.username);
    } catch (error) {
      res.status(500).json("Update tanked: " + error.message);
    }
  } else {
    res.status(403).json("You can only mess with your own stuff");
  }
};

// delete user
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdmin } = req.body;

  if (currentUserId == id || currentUserAdmin) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json("User yeeted");
    } catch (error) {
      res.status(500).json("Delete crashed: " + error.message);
    }
  } else {
    res.status(403).json("No deleting other peeps");
  }
};

// follow someone
export const followUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;
  if (_id == id) {
    res.status(403).json("Can’t follow yourself, weirdo");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);
      if (!followUser.followers.includes(_id)) {
        await followUser.updateOne({ $push: { followers: _id } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("Now following");
      } else {
        res.status(403).json("Already stalking them");
      }
    } catch (error) {
      res.status(500).json("Follow broke: " + error.message);
    }
  }
};

// unfollow someone
export const unfollowUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;
  if (_id === id) {
    res.status(403).json("Can’t unfollow yourself");
  } else {
    try {
      const unFollowUser = await UserModel.findById(id);
      const unFollowingUser = await UserModel.findById(_id);
      if (unFollowUser.followers.includes(_id)) {
        await unFollowUser.updateOne({ $pull: { followers: _id } });
        await unFollowingUser.updateOne({ $pull: { following: id } });
        res.status(200).json("Unfollowed, cya");
      } else {
        res.status(403).json("You don’t follow them");
      }
    } catch (error) {
      res.status(500).json("Unfollow died: " + error.message);
    }
  }
};