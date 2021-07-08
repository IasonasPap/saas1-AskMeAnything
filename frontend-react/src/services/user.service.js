import axios from "axios";
// import authHeader from "./auth-header.service";

const API_URL = "http://localhost:5000/";

const getPublicContent = () => {
  return axios.get(API_URL + "qa/question/findquestions");
};


const getAllQuestions = () => {
  return axios.get(API_URL + "qa/question/findquestions");
};

const getUserQuestions = (userid) => {
  return axios.post(API_URL + "qa/question/findquestionsbyuserid",{userid});
};

const getUserAnswers = (userid) => {
  return axios.post(API_URL + "qa/answer/findanswersbyuserid",{userid});
};

export default {
  getPublicContent,
  getUserQuestions,
  getAllQuestions,
  getUserAnswers
};