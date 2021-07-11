import axios from "axios";
import authHeader from "./auth-header.service";

const API_URL = "http://localhost:5005/saas1";

const getPublicContent = () => {
  return axios.get(API_URL + "question/findquestions");
};

const getUserQuestions = (userid) => {
  return axios.post(API_URL + "question/findquestionsbyuserid",{userid},{headers: authHeader()});
};

const getUserAnswers = (userid) => {
  return axios.post(API_URL + "answer/findanswersbyuserid",{userid},{headers: authHeader()});
};

export default {
  getPublicContent,
  getUserQuestions,
  getUserAnswers
};