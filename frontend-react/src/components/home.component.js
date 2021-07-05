import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import AuthenticationService from "../services/auth.service";
import AnswersService from "../services/answers.service";

import "../styling/homepage.css";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0); 
  const [numberOfAnswers, setNumberOfAnswers] = useState(0); 
  const [numberOfUsers, setNumberOfUsers] = useState(0);

  useEffect(() => {    

    AuthenticationService.getAllUsers().then(
      (response) => {
        setNumberOfUsers(response.data.length);
      },
      (error) => {
        setNumberOfUsers(-1);
      }
    );

    AnswersService.getAllAnswers().then(
      (response) => {
        setNumberOfAnswers(response.data.length);
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

    UserService.getAllQuestions().then(
      (response) => {
        setQuestions(response.data);
        setNumberOfQuestions(response.data.length);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
          setQuestions(_content);
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
        <ul>
        {typeof questions == 'string'
        ? questions
        : questions.map( ({id,title}) => 
                <li id="to-do-list-item" key={id}><span id="list-item-id">{id}</span>{title}</li>
              )}
        </ul>
      </header>
    </div>
  );
};

export default Home;