import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Image4 from './logo4.png'

import AuthService from "./controller/auth.controller";

import Login from "./view/login.view.js";
import Signup from "./view/signup.view.js";
import Home from "./view/home.view.js";
import Profile from "./view/profile.view.js";
import Answer from "./view/answer.view.js";
import Ask from "./view/askQuestion.view.js";
import Browse from "./view/browseQuestions.view.js";
import AboutUs from "./view/aboutUs.view.js";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <>
      <div className="logo-container">
        <Link to={"/"}><img src={Image4} className="logo-img"></img></Link>
      </div>     
      <header>
        <ul className="navbar">
            <li className="nav-btns">
              <ul>
                <li><Link to={"/home"} className="nav-link">Home</Link></li>
                <li><Link to={() => currentUser ? "/ask" : "/login"}>Ask Question</Link></li>
                <li><Link to={"/questions"}>Browse Questions</Link></li>
              </ul>
            </li> 
            
            {currentUser ? (
            <li className="auth-btns">
              <ul>
                  <li className="nav-item">
                    <Link to={"/profile"} className="nav-link" style={{color: "#DBCD18"}}>
                      {currentUser.username}'s
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="/home" className="nav-link" onClick={logOut}>
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
              ) : (
              <li className="auth-btns">
                <ul>
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/signup"} className="signup nav-link">
                      Sign Up,It's Free
                    </Link>
                  </li>
                </ul>
              </li>
            )}
        </ul>
      </header>

      <div className="body-container container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/answer/:id"><Answer userId={currentUser ? currentUser.user.id : ""}/></Route>
          <Route exact path="/ask" ><Ask userId={currentUser ? currentUser.user.id : ""}></Ask></Route>
          <Route exact path="/questions"><Browse currentUser={currentUser}/></Route>
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/aboutus" component={AboutUs} />
        </Switch>
      </div>
    </>
  );
};

export default App;