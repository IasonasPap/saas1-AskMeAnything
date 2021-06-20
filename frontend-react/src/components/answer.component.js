import React, { useState, useEffect } from "react";
import {useLocation, useParams} from "react-router-dom";
//import UserService from "../services/user.service";

const Question = () => {
  const {id} = useParams();
  const location = useLocation();
  console.log(location.question);
  //const {text,title} = location.question;
  console.log(id);
  // console.log(text);
  // console.log(title);
  const [answer, setAnswer] = useState("");
  
  const handleChange = (event) => {
    setAnswer(event.target.value);
  }

  const handleSubmit = (event) => {

  }

  return (
    <h3>
    
        Answer a question
    </h3>
  );
};

export default Question;