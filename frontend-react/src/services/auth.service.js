import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

const register = (username, email, password, fullName) => {
  return axios.post("https://localhost:4000/saas1/user/signup/", {
    username,    
    password,
    email,
    fullName
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};