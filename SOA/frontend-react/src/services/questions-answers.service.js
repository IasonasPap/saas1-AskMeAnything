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

const createQuestion = (question) => {
  return axios.post(API_URL + "qa/question/createquestion", question,{headers: authHeader()});
};

const deleteQuestion = (id) => {
  return axios.post(API_URL + "qa/question/deletequestion", { id },{headers: authHeader()});
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

const getAllQuestions = () => {
  return axios.get(API_URL + "qa/question/findquestions");
};

const updateAnswer = (id,text) => {
  return axios.post(API_URL + "qa/answer/updateanswertext", {id,text},{headers: {"x-auth-token":"csacascas"}});
};

const updateQuestion = (title,text) => {
  return axios.post(API_URL + "qa/question/updatequestiontext", {title,text},{headers: authHeader()});
};

  
export default {
  createAnswer,
  getAllAnswers,
  deleteAnswer,
  createQuestion,
  findQuestionById,
  filterQuestionsByKeywordAndDate,
  filterQuestionsByKeyword,
  filterQuestionsByDate,
  deleteQuestion,
  getAllQuestions,
  updateAnswer,
  updateQuestion
};