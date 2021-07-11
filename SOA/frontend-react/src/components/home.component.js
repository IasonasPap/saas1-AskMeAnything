import React, { useState, useEffect } from "react";

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

    StatisticsService.getNumberOfUsers().then(
      (response) => {
        setNumberOfUsers(response.data.count);
      },
      (error) => {
        setNumberOfUsers(-1);
      }
    );

    StatisticsService.getNumberOfAnswers().then(
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

    StatisticsService.getNumberOfQuestions().then(
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
        <h1 className="welcome">Welcome to <span>Ask Me Anything</span> ! You ask we answer...</h1>
        <ul>
            <li>
              <h1 className="counter">{numberOfQuestions}</h1>
              <i>QUESTIONS</i>
            </li>
            <li id="my-answers">
              <h1 className="counter">{numberOfAnswers}</h1>
              <i>ANSWERS</i>
            </li>
            <li>
              <h1 className="counter">{numberOfUsers}</h1>
              <i>USERS</i>
            </li>
          </ul>
        </div>
      </div>
      <div className="jumbotron">
        <div className="graph">
          <h1 className="graph-title">Question Asked Per Keyword</h1>
          <BarChart id={1} data={questionsPerKeyword.map(({word,count}) => ({label:word,value:count}))} />
        </div>
        <div className="graph">
          <h1 className="graph-title">Question Asked Per Day</h1>
          <BarChart id={2} data={questionsPerDate.map(({date,count}) => ({label:date,value:count}))} />
        </div>        
        
      </div>
      
      <footer>
        <ul>
          <li><a target="_blank" href="https://github.com/IasonasPap/saas1-AskMeAnything">about</a></li>
          <li><a target="_blank" href="https://github.com/IasonasPap/saas1-AskMeAnything">contact us</a></li>
          <li><a target="_blank" href="https://github.com/IasonasPap/saas1-AskMeAnything">project documentation</a></li>
          <li><a target="_blank" href="https://github.com/IasonasPap/saas1-AskMeAnything">gitHub</a></li>
          <li><a target="_blank" href="https://courses.pclab.ece.ntua.gr/course/view.php?id=34">course material</a></li>
        </ul>
      </footer>
    </div>
  );
};

export default Home;