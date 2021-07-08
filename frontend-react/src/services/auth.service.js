import axios from "axios";
import authHeader from "./auth-header.service";

const API_URL = "http://localhost:4000/";

const register = (username, email, password, fullName) => {
  return axios.post(API_URL + "saas1/user/signup/", {
    username,    
    password,
    email,
    fullName
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "saas1/signin/", {
      username,
      password,
    })
    .then((response) => {
      //temporary solution
      response.data["username"]=username;
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getAllUsers = (userid) => {
  return axios.get(API_URL + "saas1/user/findusers/",{userid});
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const deleteCurrentUser = (username) => {
  return axios.post(API_URL + "saas1/user/deleteuser/",{username},{headers: authHeader()});
};

const updatePassword = (username,password) => {
  return axios.post(API_URL + "saas1/user/updatepassword/",{username,password},{headers: authHeader()});
};

const getNumberOfUsers = () => {
  return axios.get(API_URL + "qa/answer/countusers");
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  getAllUsers,
  deleteCurrentUser,
  updatePassword,
  getNumberOfUsers
};