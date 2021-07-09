import React, { useState, useEffect } from "react";

import QuestionsService from "../services/questions.service";
import AuthenticationService from "../services/auth.service";
import AnswersService from "../services/answers.service";
import StatisticsService from "../services/statistics.service";

import BarChart from "./graph.component";

import "../styling/homepage.css";

const Home = () => {
  const [questionsPerDate, setQuestionsPerDate] = useState([]);
  const [questionsPerKeyword, setQuestionsPerKeyword] = useState([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0); 
  const [numberOfAnswers, setNumberOfAnswers] = useState(0); 
  const [numberOfUsers, setNumberOfUsers] = useState(0);

  useEffect(() => {

    StatisticsService.getQuestionsPerDate().then(
      (response) => {
        setQuestionsPerDate(response.data);
      },
      (error) => {
        console.log(`Error Occured: ${error.message}`);
        setQuestionsPerDate(`Error Occured: ${error.message}`);
      }
    );

    StatisticsService.getQuestionsPerKeyword().then(
      (response) => {
        setQuestionsPerKeyword(response.data);
      },
      (error) => {        
        console.log(`Error Occured: ${error.message}`);
        setQuestionsPerKeyword("Error Occured",error.message);
      }
    );

    AuthenticationService.getNumberOfUsers().then(
      (response) => {
        setNumberOfUsers(response.data.count);
      },
      (error) => {
        setNumberOfUsers(-1);
      }
    );

    AnswersService.getNumberOfAnswers().then(
      (response) => {
        console.log(response.data);
        setNumberOfAnswers(response.data.count);
      },
      (error) => {
        // const _content =
        //   (error.response && error.response.data) ||
        //   error.message ||
        //   error.toString();
        //   console.log(_content);
        setNumberOfAnswers(-1);
      }
    );

    QuestionsService.getNumberOfQuestions().then(
      (response) => {
        setNumberOfQuestions(response.data.count);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
          setNumberOfQuestions(-1);
      }
    );
  }, []);

  return (
    <div className="container">
      <div className="side-stats">
        <div className="stats-container">
        <ul>
            <li>
              <h1>{numberOfQuestions}</h1>
              <i>questions</i>
            </li>
            <li id="my-answers">
              <h1>{numberOfAnswers}</h1>
              <i>answers</i>
            </li>
            <li>
              <h1>{numberOfUsers}</h1>
              <i>users</i>
            </li>
          </ul>
        </div>
      </div>
      <header className="jumbotron">
        <BarChart id={1} data={questionsPerKeyword.map(({word,count}) => ({label:word,value:count}))} />
        <BarChart id={2} data={questionsPerDate.map(({date,count}) => ({label:date,value:count}))} />
        
      </header>
    </div>
  );
};

export default Home;