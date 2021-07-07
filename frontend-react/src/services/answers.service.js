import axios from "axios";
// import authHeader from "./auth-header.service";

const API_URL = "http://localhost:5000/";

const createAnswer = (text,userId,questionId) => {
  return axios.post(API_URL + "qa/answer/createanswer", {text,userId,questionId});
};

const getAllAnswers = () => {
  return axios.get(API_URL + "qa/answer/findanswers");
};

  
export default {
  createAnswer,
  getAllAnswers
};