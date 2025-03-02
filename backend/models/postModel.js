import mongoose from "mongoose";

// post junk
const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true }, // who posted
    desc: { type: String, required: true }, // what’s up
    likes: { type: [String], default: [] }, // who liked
    dislikes: { type: [String], default: [] }, // who hated
    createdAt: {
      type: Date,
      default: new Date(), // when it dropped
    },
    image: String, // pic if they got one
  },
  {
    timestamps: true, // mongo dates too
  }
);

var PostModel = mongoose.model("Posts", postSchema);
export default PostModel;