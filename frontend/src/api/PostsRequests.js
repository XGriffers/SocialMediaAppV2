import axios from "axios";

const url = "http://localhost:5000";

const API = axios.create({ baseURL: url }); // fine ill keep it

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem("profile");
  if (profile) {
    const token = JSON.parse(profile).token; // ugh parsing
    req.headers.Authorization = "Bearer " + token; // no fancy ticks
    console.log("slapped a token on it", token);
  }
  return req;
});

export const getTimelinePosts = (id) => {
  console.log("yo timeline for", id);
  return API.get("/posts/" + id + "/timeline");
};

export const likePost = (id, userId) => {
  console.log("likin post", id);
  return API.put("/posts/" + id + "/like", { userId: userId });
};

export const dislikePost = (id, userId) => {
  console.log("nah not this post", id);
  return API.put("/posts/" + id + "/dislikes", { userId: userId });
};