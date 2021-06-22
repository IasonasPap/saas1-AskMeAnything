import React, { useEffect } from 'react';
import {Link, useHistory} from "react-router-dom";
import "../styling/askQuestion.css";

import QuestionsService from "../services/questions.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert" role="alert">
        This field is required!
      </div>
    );
  }
};

export default function Question({userId}) {
  const history = useHistory();
  const [title, setTitle] = React.useState('');
  const [text, setText] = React.useState('');
  const [keywordsString, setKeywords] = React.useState('');

  const [submitted,setSubmitted] = React.useState(false);


  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleKeywordsChange = (event) => {
    setKeywords(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const keywords = keywordsString.split(',');
    QuestionsService.createQuestion({title,text,userId,keywords}).then(
      (response) => {
        console.log(response);
        console.log("Question Submitted")
        setSubmitted(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(resMessage);
      }
    );   
  }

  const handleCancel = () => {
    history.push("/home");
  }

  const handleNewQuestion = () => {
    setSubmitted(false);
    setTitle('');
    setText('');
    setKeywords('');
  }

  return (
    
    <div class="ask-question-container">
    { submitted ? (
      <div>
        <h4>Question Submitted Succesfully</h4>
        <button onClick={handleNewQuestion}>New Question</button>
      </div>
    ):(
    <>
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <div>
        <h3 className="label-container">Question Title :</h3>
        <textarea
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={2}
          variant="outlined"
          onChange={handleTitleChange}
          value={title}
        />
        <h3 className="label-container">Question Text :</h3>
        <textarea
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={10}
          variant="outlined"
          onChange={handleTextChange}
          value={text}
        />
        <h3 className="label-container">Keywords :</h3>
        <textarea
          id="outlined-multiline-static"
          label="Multiline"
          placeholder="Keywords seperated with commas"
          multiline
          rows={2}
          onChange={handleKeywordsChange}
          value={keywordsString}
          variant="outlined"
        />
      </div>
      <div className="btns-container">
      <button className="submit-btn">
        Submit
      </button>
      <button className="cancel-btn" onClick={handleCancel}>
        Cancel
      </button>
      </div>
    </form>
    
    </>
    )
    }
    </div>
  );
}