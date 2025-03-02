import PostModel from "../models/postModel.js";
import UserModel from "../models/userModel.js";
import mongoose from "mongoose";

// new post
export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);
  try {
    await newPost.save();
    res.status(200).json(newPost);
    console.log("post up", newPost._id);
  } catch (error) {
    res.status(500).json("Post failed: " + error.message);
  }
};

// grab a post
export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json("Post fetch broke: " + error.message);
  }
};

// tweak a post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post updated yo");
    } else {
      res.status(403).json("Not your post, dude");
    }
  } catch (error) {
    res.status(500).json("Update crashed: " + error.message);
  }
};

// delete a post
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("Post nuked");
    } else {
      res.status(403).json("Can’t delete that");
    }
  } catch (error) {
    res.status(500).json("Delete failed: " + error.message);
  }
};

// like/unlike
export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Unliked it");
    } else {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Liked it");
    }
  } catch (error) {
    res.status(500).json("Like broke: " + error.message);
  }
};

// dislike/undislike
export const dislikePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (post.dislikes.includes(userId)) {
      await post.updateOne({ $pull: { dislikes: userId } });
      res.status(200).json("Undisliked it");
    } else {
      await post.updateOne({ $push: { dislikes: userId } });
      res.status(200).json("Disliked it");
    }
  } catch (error) {
    res.status(500).json("Dislike crashed: " + error.message);
  }
};

// timeline posts
export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;
  try {
    const myPosts = await PostModel.find({ userId: userId });
    const followingPosts = await UserModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: { followingPosts: 1, _id: 0 },
      },
    ]);

    res.status(200).json(
      myPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    );
  } catch (error) {
    res.status(500).json("Timeline died: " + error.message);
  }
};