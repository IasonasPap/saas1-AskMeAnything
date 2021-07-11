import axios from "axios";

const API_URL = "http://localhost:5005/";

const getQuestionsPerKeyword = () => {
    return axios.get(API_URL + "stat/questionsperkeyword");
};

const getQuestionsPerDate = () => {
    return axios.get(API_URL + "stat/questionsperdate");
};

const getNumberOfUsers = () => {
    return axios.get(API_URL + "stat/countusers");
};

const getNumberOfQuestions = () => {
    return axios.get(API_URL + "stat/countquestions");
};

const getNumberOfAnswers = () => {
    return axios.get(API_URL + "stat/countanswers");
};

export default {
    getQuestionsPerKeyword,
    getQuestionsPerDate,
    getNumberOfUsers,
    getNumberOfQuestions,
    getNumberOfAnswers
};