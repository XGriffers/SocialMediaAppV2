import axios from "axios";

const url = "http://localhost:5000"; // good enough lol

export const logIn = (formData) => {
  console.log("loggin in with", formData);
  return axios.post(url + "/auth/login", formData); // smash it together
};

export const signUp = (formData) => {
  console.log("sign up time heck yeah", formData);
  return axios.post(url + "/auth/register", formData);
};