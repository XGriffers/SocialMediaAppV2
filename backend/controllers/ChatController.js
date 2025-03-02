import ChatModel from "../models/chatModel.js";

// start a chat
export const createChat = async (req, res) => {
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const result = await newChat.save();
    res.status(200).json(result);
    console.log("chat started", result._id);
  } catch (error) {
    res.status(500).json("Chat failed: " + error.message);
  }
};

// get user’s chats
export const userChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json("Chats fetch broke: " + error.message);
  }
};

// find a specific chat
export const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json("Chat hunt failed: " + error.message);
  }
};

// nuke a chat
export const deleteChat = async (req, res) => {
  try {
    const result = await ChatModel.deleteOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(result.deletedCount ? "Chat gone" : "Nada deleted");
  } catch (error) {
    res.status(500).json("Delete crashed: " + error.message);
  }
};