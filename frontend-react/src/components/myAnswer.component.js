import React, { useState, useEffect } from "react";
import "../styling/browseQuestions.css";

import "../styling/profile.css";

const MyAnswer = ({id,text,answeredOn,question}) => {

  const [edit,setEdit] = useState(false);
  const [answerText,setAnswerText] = useState(text);

  const handleEdit = () => edit ? (setAnswerText(text),setEdit(!edit)): setEdit(!edit)

  const handleDeleteAnswer = () => {
    console.log("DELETE ANSWER")
    const profileSettings = document.getElementById("delete-accept");
    profileSettings.style.display = "block";
  }

  const handleAcceptDelete = () => {

  }

  const handleSubmit = () => {

  }

  const handleCancel = () => {
    const profileSettings = document.getElementById("delete-accept");
    profileSettings.style.display = "none";
  }

  const handleChangeText = (event) => setAnswerText(event.target.value)

    return (
        <li key={id}>

            <div className="answer">
            <div className="edit-container" id="flex-end">               
                
                    {
                        edit
                            ? (<div>
                                <i class="fa fa-check underline" style={{ fontSize: "20px", color: "green"}}> apply</i>
                                <i className="fa fa-close underline" style={{ fontSize: "20px", color: "red", marginLeft: "15px" }} onClick={handleEdit}>cancel</i>
                            </div>)
                            : (<div>
                                <i className='fas fa-pen underline' style={{ fontSize: "20px", color: "grey" }} onClick={handleEdit}>edit</i>
                                <i className="fa fa-close underline" style={{ fontSize: "20px", color: "red", marginLeft: "15px" }} onClick={handleDeleteAnswer}> delete answer</i>
                            </div>
                            )
                    }
                </div>
                {edit
                    ? <input id="change-text" value={answerText} onChange={handleChangeText}></input>
                    : <div className="answer-text">{answerText}</div>
                }
                <div><span className="small-caps">asked on: </span> {answeredOn}</div>

                <div className="settings-container" id="delete-accept">
                <div className="modal-content">
                    <h1 style={{textAlign:"center"}}>Are you sure you want to delete it ?</h1>
                
                    <div className="settings">                    
                        <div className="change-password">

                            <button className="submit-btn" onClick={handleSubmit}>
                                Yew
                            </button>
                            <button className="submit-btn" onClick={handleCancel}>
                                No
                            </button>
                        </div>
                    </div>
                </div>

                </div>
            </div>
            
            <h2>Question Answered</h2>
            <div id="question" >
                <h2 className="title">{question.title}</h2>                      
                
                <ul className="keywords">
                    {
                        question.keywords.map(({ word }) =>
                            <li>{word}</li>
                        )
                    }
                </ul>
                <div><span className="small-caps">answered on: </span> {question.questionedOn}</div>

            </div>
        </li>);
}

export default MyAnswer;