import axios from "axios";

const url = "http://localhost:5000";

const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem("profile");
  if (profile) {
    req.headers.Authorization = "Bearer " + JSON.parse(profile).token;
    console.log("token stuck on");
  }
  return req;
});

export const getUser = (userId) => {
  console.log("who’s this guy", userId);
  return API.get("/user/" + userId);
};

export const updateUser = (id, formData) => {
  console.log("fixin up", id);
  return API.put("/user/" + id, formData);
};

export const getAllUsers = () => {
  console.log("gimme all the peeps");
  return API.get("/user");
};

export const followUser = (id, data) => {
  console.log("stalkin", id);
  return API.put("/user/" + id + "/follow", data);
};

export const unfollowUser = (id, data) => {
  console.log("buh-bye", id);
  return API.put("/user/" + id + "/unfollow", data);
};