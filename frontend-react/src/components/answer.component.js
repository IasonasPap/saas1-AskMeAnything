import React, { useState, useEffect } from "react";
import {useLocation, useParams, Link} from "react-router-dom";

import "../styling/answerQuestion.css";
import QuestionsService from "../services/questions.service";

const Question = () => {
  const {id} = useParams();
  
  //const location = useLocation();
  //console.log(location.question.answers);
  //const {answers,text,title,questionedOn} = location.question;
  const [text,setText] = useState("");
  const [title,setTitle] = useState("");
  const [questionedOn,setQuestionedOn] = useState("");
  const [answers,setAnswers] = useState([]);
  const [answer, setAnswer] = useState("");
  
  useEffect(()=> {
    QuestionsService.findQuestionById(id).then(
      (response) => {
        console.log(response);
        setText(response.data.text);
        setTitle(response.data.title);
        setQuestionedOn(response.data.questionedOn);
        setAnswers(response.data.answers);
      },
     (error) => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
          console.log(resMessage);
      // setMessage(resMessage);
      // setSuccessful(false);
    })
  },[])

  const handleChange = (event) => {
    setAnswer(event.target.value);
  }

  const handleSubmit = (event) => {

  }


  return (
    <div className="answer-container">
      <h3>      
          Answer a question
      </h3>
      <div id="question-to-answer" >
        <h2>{title}</h2>
        <div>{text}</div>
        <div>Asked on {questionedOn}</div>
      </div>
      <ul className="answers-container">
        {answers.map( (question) => 
        {
          const {id,title,text,questionedOn} = question;
          return (
          <li key={id}>
          <div id="question" >
            <Link 
              to={{pathname: "/answer/"+id, question:{question}}} 
              className="answer-link"
            >
              <h2>{title}</h2>
            </Link>
            <div>{text}</div>
            <div>Asked on {questionedOn}</div>
          </div>
          </li>);
        }
      )}
    </ul>
    <label>Give your answer:</label>
    <textarea
      id="my-answer"
      label="Multiline"
      multiline
      rows={10}
      variant="outlined"
      onChange={handleChange}
      value={answer}
    />
  </div>
  );
};

export default Question;