import React,{useState} from 'react';
import {useHistory} from "react-router-dom";
import swal from 'sweetalert';
import "../styling/askQuestion.css";

import QuestionsService from "../services/questions.service";
import AuthService from "../services/auth.service";

// const required = (value) => {
//   if (!value) {
//     return (
//       <div className="alert" role="alert">
//         This field is required!
//       </div>
//     );
//   }
// };

export default function Question({userId}) {

  const history = useHistory();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [keywordsString, setKeywords] = useState('');

  const [submitted,setSubmitted] = useState(false);


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
        setSubmitted(true);
      },
      (error) => {
        const resMessage = error.response.data.message;
        console.log(resMessage);
        
        swal("Session Expired!", "You should login to continue!", "error").then( () => {
          AuthService.logout();
          history.push("/login");
          window.location.reload();
        });
        
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
    
    <div className="ask-question-container">
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
          rows={1}
          variant="outlined"
          onChange={handleTitleChange}
          value={title}
        />
        <h3 className="label-container">Question Text :</h3>
        <textarea
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={8}
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
          rows={1}
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