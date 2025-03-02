import mongoose from "mongoose";

// chat setup
const ChatSchema = new mongoose.Schema(
  {
    members: {
      type: [String], // just user ids
    },
  },
  {
    timestamps: true, // auto dates
  }
);

const ChatModel = mongoose.model("Chat", ChatSchema);
export default ChatModel;