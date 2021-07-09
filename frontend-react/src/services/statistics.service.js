import axios from "axios";

const API_URL = "http://localhost:5001/";

const getQuestionsPerKeyword = () => {
    return axios.get(API_URL + "stat/questionsperkeyword");
};

const getQuestionsPerDate = () => {
    return axios.get(API_URL + "stat/questionsperdate");
};
  
export default {
    getQuestionsPerKeyword,
    getQuestionsPerDate
};