import axios from "axios";

const url = "http://localhost:5000";

const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem("profile");
  if (profile) {
    req.headers.Authorization = "Bearer " + JSON.parse(profile).token;
    console.log("token added yeehaw");
  }
  return req;
});

export const uploadImage = (data) => {
  console.log("pic goin up", data);
  return API.post("/upload/", data);
};

export const uploadPost = (data) => {
  console.log("postin this bad boy", data);
  return API.post("/posts", data);
};