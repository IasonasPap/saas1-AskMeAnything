import React, { useState, useEffect } from "react";
import FullWidthTabs from "./tabPanel.component.js";
import AuthService from "../services/auth.service.js";
import UserService from "../services/user.service.js";
import "../styling/profile.css";

const Profile = () => {

  const {user} = AuthService.getCurrentUser();
  const {id,username,fullName,email} = user;
  const [myQuestions,setMyQuestions] = useState([]);
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    UserService.getUserQuestions(id).then(
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
  }, []);

  const handleChangePassword = () => {
    setChangePassword(true);
  }
  const handleCancel = () => {
    setChangePassword(false);
  }

  return (
    <div className="profile-container">
      <div className="profile-name">
        {user.username + "'s profile"}
      </div>
      <div className="profile-info">
        <div className="profile-user">
          <ul>
            <li>
              <h3>username: <span className="info">{username}</span></h3>
            </li>
            <li>
              <h3>fullname: <span className="info">{fullName}</span></h3>
            </li>
            <li>
              <h3>email: <span className="info">{email}</span></h3>
            </li>
            <li>
              <h4 onClick={handleChangePassword}><i class="fa fa-lock" style={{fontSize:"15px"}}></i> change password</h4>
              
              {changePassword && 
              <div className="change-password">
                <div class="feature-body">
                <label for="old-password"> Old Password </label>
                <input type="password" autocomplete="new-password" id="old-password" maxlength="99" placeholder="Old Password"/>
                </div>
                <button className="submit-btn">
                Submit
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
              </div>
              
              }
            </li>
          </ul>
        </div>

        <div className="profile-stats">
          <ul>
            <li>
              <h1>1</h1>
              <i>questions</i>
            </li>
            <li id="my-answers">
              <h1>2</h1>
              <i>answers</i>
            </li>
            <li>
              <h1>3</h1>
              <i>asns</i>
            </li>
          </ul>
        </div>

      </div>

      <div className="profile-questions">
        <FullWidthTabs myQuestions={myQuestions}></FullWidthTabs>
      </div>

    </div>
  );
};

export default Profile;