import axios from "axios";
import authHeader from "./auth-header.service";

const createQuestion = (question) => {
    return axios.post("https://localhost:5000/qa/question/createquestion", question);
  };
  
const findQuestionById = (id) => {
  return axios.post("https://localhost:5000/qa/question/findquestionbyid", { id });
};
  
export default {
  createQuestion,
  findQuestionById
};