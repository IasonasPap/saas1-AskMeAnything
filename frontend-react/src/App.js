import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component.js";
import Signup from "./components/signup.component.js";
import Home from "./components/home.component.js";
import Profile from "./components/profile.component.js";
import Answer from "./components/answer.component.js";
import Ask from "./components/askQuestion.component.js";
import Browse from "./components/browseQuestions.component.js";

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
      <header>
        <ul className="navbar">
            <li><Link to={"/"} className="navbar-brand">Logo</Link></li>
            <li><Link to={"/home"} className="nav-link">Home</Link></li>
            <li><Link to={() => currentUser ? "/ask" : "/login"}>Ask Question</Link></li>
            <li><Link to={"/answer/1"}>Answer Question</Link></li>
            <li><Link to={"/questions"}>Browse Questions</Link></li>
            {currentUser ? (
            <li className="auth-btns">
              <ul>
                  <li className="nav-item">
                    <Link to={"/profile"} className="nav-link">
                      {currentUser.username}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="/home" className="nav-link" onClick={logOut}>
                      LogOut
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
            
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/answer/:id"><Answer currentUser={currentUser}/></Route>
          <Route exact path="/ask" component={Ask} />
          <Route exact path="/questions"><Browse currentUser={currentUser}/></Route>
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </div>
    </>
  );
};

export default App;