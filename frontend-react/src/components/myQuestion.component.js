import React, { useState, useEffect } from "react";

import "../styling/profile.css";

const MyQuestion = ({id,title,text,questionedOn,keywords,answers}) => {
    
  const [edit,setEdit] = useState(false);
  const [questionTitle,setQuestionTitle] = useState(title);
  const [questionText,setQuestionText] = useState(text);

  const handleEdit = () => edit ? (setQuestionText(text),setQuestionTitle(title),setEdit(!edit)): setEdit(!edit)

  const handleDeleteQuestion = () => {
    console.log("delete question")
  }

  const handleChangeText = (event) => setQuestionText(event.target.value)

  const handleChangeTitle = (event) => setQuestionTitle(event.target.value)

    return (
        <li key={id}>
            <div id="question" >
                <div className="edit-container">
                    {edit
                        ? <input id="change-title" value={questionTitle} onChange={handleChangeTitle}></input>
                        : <h2 className="title">{questionTitle}</h2>
                    }
                    {
                        edit
                            ? (<div>
                                <i class="fa fa-check underline" style={{ fontSize: "20px", color: "green"}}> apply</i>
                                <i className="fa fa-close underline" style={{ fontSize: "20px", color: "red", marginLeft: "15px" }} onClick={handleEdit}>cancel</i>
                            </div>)
                            : (<div>
                                <i className='fas fa-pen underline' style={{ fontSize: "20px", color: "grey" }} onClick={handleEdit}>edit</i>
                                <i className="fa fa-close underline" style={{ fontSize: "20px", color: "red", marginLeft: "15px" }} onClick={handleDeleteQuestion}> delete question</i>
                            </div>
                            )
                    }
                </div>

                {edit
                    ? <input id="change-text" value={questionText} onChange={handleChangeText}></input>
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