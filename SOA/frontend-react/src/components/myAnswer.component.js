import React, { useState} from "react"; 
import {Link,useHistory} from "react-router-dom";
import QuestionsAnswersService from '../services/questions-answers.service'
import AuthService from '../services/auth.service'
import "../styling/browseQuestions.css";
import swal from 'sweetalert';

import "../styling/profile.css";

const MyAnswer = ({answer,handleDelete}) => {
    const {id,text,answeredOn,question,questionId} = answer;
    const history = useHistory();
    const [editAnswer,setEditAnswer] = useState(false);
    const [answerText,setAnswerText] = useState(text);

    const handleEditAnswer = () => editAnswer ? (setAnswerText(text),setEditAnswer(!editAnswer)): setEditAnswer(!editAnswer)

    const handleApplyEdit = () => {
        QuestionsAnswersService.updateAnswer(id,answerText).then(
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

    const handleChangeText = (event) => setAnswerText(event.target.value)

    return (
        <li key={id}>
            <div className="answer">
                <div className="edit-container" id="flex-end"> 
                    {
                    editAnswer
                    ? (<div>
                            <i className="fa fa-check underline" style={{ fontSize: "20px", color: "green"}} onClick={handleApplyEdit}> apply</i>
                            <i className="fa fa-close underline" style={{ fontSize: "20px", color: "red", marginLeft: "15px" }} onClick={handleEditAnswer}>cancel</i>
                        </div>)
                    : (<div>
                            <i className='fas fa-pen underline' style={{ fontSize: "20px", color: "grey" }} onClick={handleEditAnswer}>edit</i>
                            <i className="fa fa-close underline" style={{ fontSize: "20px", color: "red", marginLeft: "15px" }} onClick={() => handleDelete(id,"accept-delete-answer")}> delete answer</i>
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

            <h2>Question Answered:</h2>
            <div className="question" id="question-answered">
                <Link 
                    to={{pathname: `/answer/${questionId}`}} 
                    className="answer-link"
                >
                    <h2 className="title">{question.title}</h2>
                </Link>                   

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