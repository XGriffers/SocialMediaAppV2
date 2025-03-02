import axios from "axios";

const base = "http://localhost:5000"; // whatever

export const createChat = (data) => {
  console.log("making a chat yo", data);
  return axios.post(base + "/chat/", data);
};

export const userChats = (id) => {
  console.log("grabbing chats for", id);
  return axios.get(base + "/chat/" + id); // old school concat
};

export const findChat = (firstId, secondId) => {
  console.log("finding chat between", firstId, secondId);
  return axios.get(base + "/chat/find/" + firstId + "/" + secondId);
};