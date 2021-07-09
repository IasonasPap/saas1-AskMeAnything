import axios from "axios";
import authHeader from "./auth-header.service";

const API_URL = "http://localhost:5000/";

const createQuestion = (question) => {
  return axios.post(API_URL + "qa/question/createquestion", question,{headers: { 'x-auth-token':"hdfsghdshdfs56343"}});
};

const deleteQuestion = (id) => {
  return axios.post(API_URL + "qa/question/deletequestion", { id },{headers: { 'x-auth-token':"hdfsghdshdfs56343"}});
};
  
const findQuestionById = (id) => {
  return axios.post(API_URL + "qa/question/findquestionbyid", { id },{headers: authHeader()});
};

const filterQuestionsByKeywordAndDate = (startDate, endDate, word) => {
  return axios.post(API_URL + "qa/question/findquestionsbydateandkeyword", {startDate, endDate, word});
};

const filterQuestionsByKeyword = (word) => {
  return axios.post(API_URL + "qa/question/findquestionsbykeyword", {word});
};

const filterQuestionsByDate = (startDate, endDate) => {
  return axios.post(API_URL + "qa/question/findquestionsbydate", {startDate, endDate});
};

const getNumberOfQuestions = () => {
  return axios.get(API_URL + "qa/question/countquestions");
};
  
export default {
  createQuestion,
  findQuestionById,
  filterQuestionsByKeywordAndDate,
  filterQuestionsByKeyword,
  filterQuestionsByDate,
  getNumberOfQuestions,
  deleteQuestion
};