import axios from "axios";
import authHeader from "./auth-header.service";

const API_URL = "https://localhost:5000/datalayer/question/findquestions";

const getPublicContent = () => {
  return axios.get("https://localhost:5000/qa/question/findquestions");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};