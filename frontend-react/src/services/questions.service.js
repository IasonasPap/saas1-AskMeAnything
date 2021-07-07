import axios from "axios";

const createQuestion = (question) => {
    return axios.post("http://localhost:5000/qa/question/createquestion", question);
  };
  
const findQuestionById = (id) => {
  return axios.post("http://localhost:5000/qa/question/findquestionbyid", { id });
};

const filterQuestionsByKeywordAndDate = (startDate, endDate, word) => {
  return axios.post("http://localhost:5000/qa/question/findquestionsbydateandkeyword", {startDate, endDate, word});
};

const filterQuestionsByKeyword = (word) => {
  return axios.post("http://localhost:5000/qa/question/findquestionsbykeyword", {word});
};

const filterQuestionsByDate = (startDate, endDate) => {
  return axios.post("http://localhost:5000/qa/question/findquestionsbydate", {startDate, endDate});
};
  
export default {
  createQuestion,
  findQuestionById,
  filterQuestionsByKeywordAndDate,
  filterQuestionsByKeyword,
  filterQuestionsByDate
};