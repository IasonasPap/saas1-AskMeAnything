import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom"
import FullWidthTabs from "./tabPanel.component.js";
import AuthService from "../services/auth.service.js";
import UserService from "../services/user.service.js";
import "../styling/profile.css";

const Profile = () => {

  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [myQuestions,setMyQuestions] = useState([]);
  const [myAnswers,setMyAnswers] = useState([]);
  const [newPassword,setNewPassword] = useState("");
  const [repeatNewPassword,setRepeatNewPassword] = useState("");
  const [message, setMessage] = useState("");

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
    if(newPassword !== repeatNewPassword) {
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
    const profileSettings = document.getElementById("profile-settings");
    profileSettings.style.display = "block";
  }

  const handleExit = () => {
    const profileSettings = document.getElementById("profile-settings");
    profileSettings.style.display = "none";
  }

  const handleDelete = () => {
    AuthService.deleteCurrentUser(currentUser.username).then(
      () => {
        AuthService.logout()
        history.push("/home");
        window.location.reload();
        
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setMyQuestions(_content);
      }
    );
  }

  const handleDeleteAnswer = () => {
    console.log("DELETE ANSWER")
    const profileSettings = document.getElementById("accept-delete");
    profileSettings.style.display = "block";
}

  return (
    (!currentUser ? (<div>Loading...</div>) :
    (<div className="profile-container">
      <div className="profile-name">
        <h2>{currentUser.username + "'s profile"}</h2>       
        <i className="fa fa-gear" style={{fontSize:"24px"}} onClick={handleSettings}></i>
      </div>
      <div className="accept-delete-container" id="accept-delete">
          <div className="accept-delete-content">
              <h1 style={{textAlign:"center"}}>Are you sure you want to delete it ?</h1>

              <div className="accept-delete">                    
                  <div>
                      <button className="submit-btn" onClick>Yes</button>
                      <button className="submit-btn" onClick={handleDeleteAnswer}>No</button>
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

                <button className="submit-btn" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
              <h4><i className="fa fa-close" style={{fontSize:"15px"}}></i> delete my profile</h4>
              <button className="cancel-btn delete-user-btn" onClick={handleDelete}>
                Delete Profile
              </button>
              </div>
        </div>

      </div>

      <div className="profile-info">
        <div className="profile-user">
          <ul>
            <li>
              <h3>username: <span className="info">{currentUser.user.username}</span></h3>
            </li>
            <li>
              <h3>fullname: <span className="info">{currentUser.user.fullName}</span></h3>
            </li>
            <li>
              <h3>email: <span className="info">{currentUser.user.email}</span></h3>
            </li>
          </ul>
        </div>

        <div className="profile-stats">
          <ul>
            <li>
              <h1>{myQuestions.length}</h1>
              <i>questions</i>
            </li>
            <li id="my-answers">
              <h1>{myAnswers.length}</h1>
              <i>answers</i>
            </li>
          </ul>
        </div>

      </div>

      <div className="profile-questions">
        <FullWidthTabs handleDeleteAnswer={handleDeleteAnswer} myQuestions={myQuestions} myAnswers={myAnswers}></FullWidthTabs>
      </div>

    </div>))
  );
};

export default Profile;