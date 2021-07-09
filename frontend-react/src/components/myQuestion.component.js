import React, { useState, useEffect } from "react";

import "../styling/profile.css";

const MyQuestion = ({id,title,text,questionedOn,keywords,answers}) => {
    
  const [editQuestion,setEditQuestion] = useState(false);  
  const [questionText,setQuestionText] = useState(text);

  const handleEditQuestion = () => editQuestion ? (setQuestionText(text),setEditQuestion(!editQuestion)): setEditQuestion(!editQuestion)

  const handleDeleteQuestion = () => {
    console.log("delete question")
  }

  const handleChangeText = (event) => setQuestionText(event.target.value)

    return (
        <li key={id}>
            <div id="question">
                <div className="edit-container">
                    {/* <input id="change-title" value={questionTitle} onChange={handleChangeTitle}></input> */}
                    <h2 className="title">{title}</h2>
                    {
                        editQuestion
                            ? (<div>
                                <i className="fa fa-check underline" style={{ fontSize: "20px", color: "green"}}> apply</i>
                                <i className="fa fa-close underline" style={{ fontSize: "20px", color: "red", marginLeft: "15px" }} onClick={handleEditQuestion}>cancel</i>
                            </div>)
                            : (<div>
                                <i className='fas fa-pen underline' style={{ fontSize: "20px", color: "grey" }} onClick={handleEditQuestion}>edit</i>
                                <i className="fa fa-close underline" style={{ fontSize: "20px", color: "red", marginLeft: "15px" }} onClick={handleDeleteQuestion}> delete question</i>
                            </div>
                            )
                    }
                </div>

                {editQuestion
                    ? <textarea rows={3} id="change-text" value={questionText} onChange={handleChangeText}></textarea>
                    : <div>{questionText}</div>
                }
                
                <ul className="keywords">
                    {
                        keywords.map(({ word }) =>
                            <li>{word}</li>
                        )
                    }
                </ul>
                <div><span className="small-caps">answered on: </span> {questionedOn}</div>

            </div>
            <h2>Answers({answers.length})</h2>
            {answers.length ?
                (<ul>
                    {answers.map(({ text, answeredOn }) =>
                        <li className="answer">
                            <div className="answer-text">{text}</div>
                            <div><span className="small-caps">asked on: </span> {answeredOn}</div>
                        </li>
                    )}
                </ul>
                ) : (
                    []
                )
            }
        </li>);
}

export default MyQuestion;