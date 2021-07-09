import React, { useState, useEffect } from "react";
import "../styling/browseQuestions.css";

import "../styling/profile.css";

const MyAnswer = ({answer,handleDeleteAnswer}) => {
    const {id,text,answeredOn,question} = answer;
    const [editAnswer,setEditAnswer] = useState(false);
    const [answerText,setAnswerText] = useState(text);

    const handleEditAnswer = () => editAnswer ? (setAnswerText(text),setEditAnswer(!editAnswer)): setEditAnswer(!editAnswer)

    // const handleDeleteAnswer = () => {
    //     console.log("DELETE ANSWER")
    //     const profileSettings = document.getElementById("accept-delete");
    //     profileSettings.style.display = "block";
    // }

    const handleAcceptDelete = () => {

    }

    const handleSubmit = () => {

    }

    // const handleCancel = () => {
    //     const profileSettings = document.getElementById("accept-delete");
    //     profileSettings.style.display = "none";
    // }

    const handleChangeText = (event) => setAnswerText(event.target.value)

    return (
        <li key={id}>
            <div className="answer">
                <div className="edit-container" id="flex-end"> 
                    {
                    editAnswer
                    ? (<div>
                            <i className="fa fa-check underline" style={{ fontSize: "20px", color: "green"}}> apply</i>
                            <i className="fa fa-close underline" style={{ fontSize: "20px", color: "red", marginLeft: "15px" }} onClick={handleEditAnswer}>cancel</i>
                        </div>)
                    : (<div>
                            <i className='fas fa-pen underline' style={{ fontSize: "20px", color: "grey" }} onClick={handleEditAnswer}>edit</i>
                            <i className="fa fa-close underline" style={{ fontSize: "20px", color: "red", marginLeft: "15px" }} onClick={() => handleDeleteAnswer(id)}> delete answer</i>
                        </div>
                    )
                    }
                </div>

                {editAnswer
                    ? <input id="change-text" value={answerText} onChange={handleChangeText}></input>
                    : <div className="answer-text">{answerText}</div>
                }
                <div><span className="small-caps">asked on: </span> {answeredOn}</div>

                

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
        </li>
    );
}

export default MyAnswer;