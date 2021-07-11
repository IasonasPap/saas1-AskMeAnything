import axios from "axios";
import authHeader from "./auth-header.service";

const API_URL = "http://localhost:5005/saas1/";

const register = (username, email, password, fullName) => {
  return axios.post(API_URL + "user/signup/", {
    username,    
    password,
    email,
    fullName
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "auth/signin/", {
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
  return axios.get(API_URL + "user/findusers/",{userid},{headers: authHeader()});
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const deleteCurrentUser = (username) => {
  return axios.post(API_URL + "user/deleteuser/",{username},{headers: authHeader()});
};

const updatePassword = (username,password) => {
  return axios.post(API_URL + "user/updatepassword/",{username,password},{headers: authHeader()});
};


export default {
  register,
  login,
  logout,
  getCurrentUser,
  getAllUsers,
  deleteCurrentUser,
  updatePassword
};