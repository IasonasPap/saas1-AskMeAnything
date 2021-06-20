//import React, { useState, useEffect } from "react";

import AuthService from "../services/auth.service.js";

const Profile = () => {

  const currentUser = AuthService.getCurrentUser();

  return (
    <h3><strong>{currentUser && currentUser.username}</strong>
        My Profile
    </h3>
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