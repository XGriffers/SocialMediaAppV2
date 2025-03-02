import mongoose from "mongoose";

// msg stuff
const MessageSchema = new mongoose.Schema(
  {
    chatId: {
      type: String, // which chat
    },
    senderId: {
      type: String, // who sent it
    },
    text: {
      type: String, // what they said
    },
    // receiverId: { type: String }, // not used rn, maybe later?
  },
  {
    timestamps: true, // when it happened
  }
);

const MessageModel = mongoose.model("Message", MessageSchema);
export default MessageModel;