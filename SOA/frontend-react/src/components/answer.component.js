import React, { useState, useEffect } from "react";
import {useParams, useHistory, Link} from "react-router-dom";

import "../styling/answerQuestion.css";
import QuestionsAnswersService from "../services/questions-answers.service";

const Question = ({userId}) => {
  const {id} = useParams();
  const history = useHistory();
  
  const [text,setText] = useState("");
  const [title,setTitle] = useState("");
  const [keywords,setKeywords] = useState([]);
  const [questionedOn,setQuestionedOn] = useState("");
  const [answers,setAnswers] = useState([]);
  const [answer, setAnswer] = useState("");
  const [submitted,setSubmitted] = useState(false);
  
  useEffect(()=> {
    QuestionsAnswersService.findQuestionById(id).then(
      (response) => {
        setText(response.data.text);
        setTitle(response.data.title);
        setKeywords(response.data.keywords);
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
    })
  },[])

  const handleChange = (event) => {
    setAnswer(event.target.value);
  }

  const handleSubmit = (event) => {
    QuestionsAnswersService.createAnswer(answer,userId,id).then(() => {
      setSubmitted(true);
    })
  }

  const handleCancel = () => {
    history.push("/questions");
  }

  const handleNewAnswer = () => {
    setSubmitted(false);
    setAnswer('');
  }

  return (
    <div className="answer-container">
      {/* <h3>      
          Answer a question
      </h3> */}
      {submitted ? (
        <div className="submitted">
          <h1 style={{fontFamily:"Noto Sans JP"}}>Answer Submitted Succesfully</h1>
          <button onClick={handleNewAnswer}>Give Another Answer</button>
        </div>
      ):(
      (title === "")?
      <div className="loader">
      </div>
      : 
      <>
      <div className="question">
        <h2>{title}</h2>
        <div>{text}</div>
        <ul className="keywords">
          {
            keywords.map(({word}) => 
              <li>{word}</li>
            )
          }
        </ul>
        <div><span className="small-caps">asked on: </span>{questionedOn}</div>
      </div>

      <h2>Answers({answers.length})</h2>
      {answers.length ?
        (<ul>                    
            {answers.map(({text,answeredOn}) => 
              <li className="answer">
                <div className="answer-text">{text}</div>
                
                <div><span className="small-caps">answered on:</span> {answeredOn}</div>
              </li>
            )}
        </ul>
        ):(
          []
        )
      }

    <div>
    <h2>Give your answer:</h2>
      {!userId ? (
      <div className="not-loged-in">
        <i class="fa fa-exclamation-circle" style={{fontSize:"80px", color:"yellow"}}><span style={{fontSize:"40px",color:"black",padding:"10x"}}>You should log in to answer a Question !</span></i>
        <Link 
          to={{pathname: "/login"}} 
          className="answer-link"
        >
          <button style={{marginTop:"20px"}} onClick={() => {history.push('/login')}}>Login!</button>
        </Link>
      </div>      
      ):(        
      <div>
      
      <textarea
        id="my-answer"
        label="Multiline"
        multiline
        rows={8}
        variant="outlined"
        onChange={handleChange}
        value={answer}
      />
      <div className="btns-container">
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
        <button className="cancel-btn" onClick={handleCancel}>
          Cancel
        </button>
      </div>
      
      </div>
      )
      }
    </div>
    
    
    </>
    )}
    </div>
  );
};

export default Question;