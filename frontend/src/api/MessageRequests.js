import axios from "axios";

const url = "http://localhost:5000"; // same ol

export const getMessages = (id) => {
  console.log("getting msgs for", id);
  return axios.get(url + "/message/" + id);
};

export const addMessage = (data) => {
  console.log("sending msg", data);
  return axios.post(url + "/message/", data);
};