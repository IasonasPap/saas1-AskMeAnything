//import React, { useState, useEffect } from "react";
import FullWidthTabs from "./tabPanel.component.js";
import AuthService from "../services/auth.service.js";
import "../styling/profile.css";

const Profile = () => {

  const {user} = AuthService.getCurrentUser();
  const {username,fullName,email} = user;

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

      <FullWidthTabs></FullWidthTabs>

      <div className="profile-questions">
        <h1>My Questions</h1>
        
      </div>

      <div className="profile-answers">
        <h1>My Answers</h1>
      </div>

    </div>
  );
};

export default Profile;
// import React from "react";
// import AuthService from "../services/auth.service";

// const Profile = () => {
//   const currentUser = AuthService.getCurrentUser();

//   return (
//     <div className="container">
//       <header className="jumbotron">
//         <h3>
//           <strong>{currentUser.username}</strong> Profile
//         </h3>
//       </header>
//       <p>
//         <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
//         {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
//       </p>
//       <p>
//         <strong>Id:</strong> {currentUser.id}
//       </p>
//       <p>
//         <strong>Email:</strong> {currentUser.email}
//       </p>
//       <strong>Authorities:</strong>
//       <ul>
//         {currentUser.roles &&
//           currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
//       </ul>
//     </div>
//   );
// };

// export default Profile;