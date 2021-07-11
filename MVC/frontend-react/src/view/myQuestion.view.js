import React, { useState } from "react";
import {useHistory} from "react-router-dom"
import QuestionsAnswersService from '../controller/questions-answers.controller'
import AuthService from "../controller/auth.controller.js";
import "../styling/profile.css";
import swal from 'sweetalert';

const MyQuestion = ({question, handleDelete}) => {
  const {id,title,text,questionedOn,keywords,answers} = question;
  const history = useHistory();
  const [editQuestion,setEditQuestion] = useState(false);  
  const [questionText,setQuestionText] = useState(text);

  const handleEdit = () => editQuestion ? (setQuestionText(text),setEditQuestion(!editQuestion)): setEditQuestion(!editQuestion)

  const handleApplyEdit = () => {
    QuestionsAnswersService.updateQuestion(title,questionText).then(
        (response) => {
            history.push("/profile");
            window.location.reload();
        },
        (error) => {
            if(error.response.status) {
                swal("Session Expired!", "You should login to continue!", "error").then( () => {
                    AuthService.logout();
                    history.push("/login");
                    window.location.reload();
                  });
            }
        }
    )
  }

  const handleChangeText = (event) => setQuestionText(event.target.value)

    return (
        <li key={id}>
            <div className="question">
                <div className="edit-container">
                    {/* <input id="change-title" value={questionTitle} onChange={handleChangeTitle}></input> */}
                    <h2 className="title">{title}</h2>
                    {
                        editQuestion
                            ? (<div>
                                <i className="fa fa-check underline" style={{ fontSize: "20px", color: "green"}} onClick={handleApplyEdit}> apply</i>
                                <i className="fa fa-close underline" style={{ fontSize: "20px", color: "red", marginLeft: "15px" }} onClick={handleEdit}>cancel</i>
                            </div>)
                            : (<div>
                                <i className='fas fa-pen underline' style={{ fontSize: "20px", color: "grey" }} onClick={handleEdit}>edit</i>
                                <i className="fa fa-close underline" style={{ fontSize: "20px", color: "red", marginLeft: "15px" }} onClick={() => handleDelete(id,"accept-delete-question")}> delete question</i>
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