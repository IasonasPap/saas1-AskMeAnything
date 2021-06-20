import axios from "axios";
import authHeader from "./auth-header.service";

const API_URL = "https://localhost:5000/datalayer/question/findquestions";

const getPublicContent = () => {
  //return fetch('https://localhost:5000/qa/question/findquestions');
  // .then(response => response.json())
  // .then(data => {
  //   console.log(data);
  //   return data;
  // });
  return axios.get("https://localhost:5000/qa/question/findquestions");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard
};