import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom"
import FullWidthTabs from "./tabPanel.view.js";
import AuthService from "../controller/auth.controller.js";
import UserService from "../controller/user.controller.js";
import QuestionsAnswersService from "../controller/questions-answers.controller.js";
import "../styling/profile.css";
import swal from 'sweetalert';

const Profile = () => {

  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [myQuestions,setMyQuestions] = useState([]);
  const [myAnswers,setMyAnswers] = useState([]);
  const [newPassword,setNewPassword] = useState("");
  const [repeatNewPassword,setRepeatNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [id,setId] = useState("");

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      UserService.getUserQuestions(user.user.id).then(
        (response) => {
          setMyQuestions(response.data);
        },
        (error) => {
          const _content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
  
          setMyQuestions(_content);
        }
      );

      UserService.getUserAnswers(user.user.id).then(
        (response) => {
          setMyAnswers(response.data);
        },
        (error) => {
          const _content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
  
          setMyAnswers(_content);
        }
      );
    }
    
  }, []);

  const handleNewPasswordChange = (event) => setNewPassword(event.target.value)

  const handleRepeatNewPasswordChange = (event) => {
    if(newPassword !== event.target.value) {
      setMessage("Both passwords should match !")
    } else {
      setMessage("")
    }
    setRepeatNewPassword(event.target.value)
  }

  const handleSubmit = () => {
    if(newPassword === "") setMessage("No password provided !")
    else if (newPassword !== repeatNewPassword) {
      setMessage("Both passwords should match !")
    } else {
      AuthService.updatePassword(currentUser.username,newPassword).then(
        () => {
          handleExit();
        }
      );
    }
  }

  const handleSettings = () => {
    console.log("OPEN SETTINGS")
    const profileSettings = document.getElementById("profile-settings");
    profileSettings.style.display = "block";
  }

  const handleDelete = (id,divToBeHidden) => {
    console.log("DELETE ANSWER OR")
    const profileSettings = document.getElementById(divToBeHidden);
    profileSettings.style.display = "block";
    setId(id);
  }

  const handleExit = () => {
    console.log("EXIT PROFILE SETTINGS")
    const profileSettings = document.getElementById("profile-settings");
    profileSettings.style.display = "none";
  }

  const handleCancel = (divToBeHidden) => {
    console.log("CANCEL DELETE ANSWER")
    const profileSettings = document.getElementById(divToBeHidden);
    profileSettings.style.display = "none";
  }

  const handleDeleteProfile = () => {
    AuthService.deleteCurrentUser(currentUser.username).then(
      () => {
        AuthService.logout()
        history.push("/home");
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
    );
  }

  const handleDeleteAnswerAccepted = () => {
    QuestionsAnswersService.deleteAnswer(id).then(
      () => {
        setId("");
        const profileSettings = document.getElementById("accept-delete-answer");
        profileSettings.style.display = "none";
        window.location.reload();
      }
    )
  }

  const handleDeleteQuestionAccepted = () => {
    QuestionsAnswersService.deleteQuestion(id).then(
      () => {
        setId("");
        const profileSettings = document.getElementById("accept-delete-question");
        profileSettings.style.display = "none";
        window.location.reload();
      }
    )
  }

  return (
    (!currentUser ? (<div>Loading...</div>) :
    (<div className="profile-container">
      
      <div style={{backgroundColor:"#9bc3e9"}}>
        {/* {succesful && <i className="fa fa-check-circle" style={{fontSize:"24px",color:"green"}}> Deleted Succesfully !</i>} */}
        <div className="profile-name">
          <h1 style={{margin:"14px 0"}}>{currentUser.username + "'s profile"}</h1>       
          <i className="fa fa-gear" style={{fontSize:"24px"}} onClick={handleSettings}></i>
        </div>
        <div id="my-info">
          my info
        </div>
      </div>
      
      <div className="accept-delete-answer-container" id="accept-delete-answer">
          <div className="accept-delete-answer-content">
              <h1 style={{textAlign:"center"}}>Are you sure you want to delete it ?</h1>

              <div className="accept-answer-delete">                    
                  <div>
                      <button className="submit-btn" onClick={handleDeleteAnswerAccepted}>Yes</button>
                      <button className="submit-btn" onClick={() => handleCancel("accept-delete-answer")}>No</button>
                  </div>
              </div>
          </div>
      </div>
      <div className="accept-delete-question-container" id="accept-delete-question">
          <div className="accept-delete-question-content">
              <h1 style={{textAlign:"center"}}>Are you sure you want to delete it ?</h1>

              <div className="accept-question-delete">                    
                  <div>
                      <button className="submit-btn" onClick={handleDeleteQuestionAccepted}>Yes</button>
                      <button className="submit-btn" onClick={() => handleCancel("accept-delete-question")}>No</button>
                  </div>
              </div>
          </div>
      </div>
      <div className="settings-container" id="profile-settings">
        <div className="modal-content">
          <span className="close" onClick={handleExit}>&times;</span>
          <h1 style={{textAlign:"center"}}>Profile Settings</h1>
          
              <div className="settings">
              <h4><i className="fa fa-lock" style={{fontSize:"15px"}}></i> change password</h4>
              <div className="change-password">
                <div className="feature-body">
                  <label> New Password </label>
                  <input 
                    type="password" 
                    value={newPassword} 
                    onChange={handleNewPasswordChange}
                    id="new-password"
                    placeholder="New Password"
                  />

                  <label> Repeat New Password </label>
                  <input 
                    type="password" 
                    value={repeatNewPassword} 
                    onChange={handleRepeatNewPasswordChange}
                    id="repeat-new-password"
                    placeholder="Repeat New Password"

                  />
                </div>
                {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
                )}

                <button className="submit-btn" id="submit-psw" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
              <h4><i className="fa fa-close" style={{fontSize:"15px"}}></i> delete my profile</h4>
              <button className="cancel-btn delete-user-btn" onClick={handleDeleteProfile}>
                Delete Profile
              </button>
              </div>
        </div>

      </div>

      <div className="profile-info-container">
        <div className="profile-user">
          <ul>
            <li>
              <h2 className="profile-info">username: <span className="info">{currentUser.user.username}</span></h2>
            </li>
            <li>
              <h2 className="profile-info">fullname: <span className="info">{currentUser.user.fullName}</span></h2>
            </li>
            <li>
              <h2 className="profile-info">email: <span className="info">{currentUser.user.email}</span></h2>
            </li>
          </ul>
        </div>

        <div className="profile-stats">
          <ul>
            <li>
              <h1 className="counter">{myQuestions.length}</h1>
              <i>QUESTIONS</i>
            </li>
            <li id="my-answers">
              <h1  className="counter">{myAnswers.length}</h1>
              <i>ANSWERS</i>
            </li>
          </ul>
        </div>

      </div>

      <div className="profile-questions">
        <FullWidthTabs handleDelete={handleDelete} myQuestions={myQuestions} myAnswers={myAnswers}></FullWidthTabs>
      </div>

    </div>))
  );
};

export default Profile;