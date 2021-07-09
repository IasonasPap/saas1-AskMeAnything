import axios from "axios";
import authHeader from "./auth-header.service";

const API_URL = "http://localhost:5000/";

const createAnswer = (text,userId,questionId) => {
  return axios.post(API_URL + "qa/answer/createanswer", {text,userId,questionId},{headers: authHeader()});
};

const getAllAnswers = () => {
  return axios.get(API_URL + "qa/answer/findanswers");
};

const deleteAnswer = (answerId) => {
  return axios.post(API_URL + "qa/answer/deleteanswer",{id: answerId}, {headers: authHeader()});
};

const getNumberOfAnswers = () => {
  return axios.get(API_URL + "qa/answer/countanswers");
};

  
export default {
  createAnswer,
  getAllAnswers,
  getNumberOfAnswers,
  deleteAnswer
};