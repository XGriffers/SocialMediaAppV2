import MessageModel from "../models/messageModel.js";

// send a msg
export const addMessage = async (req, res) => {
  const { chatId, senderId, text, timeStamp } = req.body;
  const message = new MessageModel({
    chatId,
    senderId,
    text,
    timeStamp: timeStamp || new Date(), // default to now
  });
  try {
    const result = await message.save();
    res.status(200).json(result);
    console.log("msg sent", text);
  } catch (error) {
    res.status(500).json("Msg flop: " + error.message);
  }
};

// get chat msgs
export const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await MessageModel.find({ chatId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json("Msgs fetch died: " + error.message);
  }
};