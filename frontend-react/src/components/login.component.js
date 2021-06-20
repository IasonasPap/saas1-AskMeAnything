import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";
import "../styling/signin.css";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          props.history.push("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div class="auth page font-lgr">
        <div class="auth-box flex flex-direction-column justify-content-center align-items-center">
            
            <h1 id="title">Ask Me Anything</h1>

        <Form name="loginForm" onSubmit={handleLogin} ref={form} novalidate>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div class="flex input-container">
            <Input
              type="text"
              className="flex-1-1-auto font-lgr"
              name="username"
              id="username"
              placeholder="Username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div class="flex input-container">
            <Input
              id="password"
              type="password"
              placeholder="Password"
              className="flex-1-1-auto font-lgr"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
            </div>
          </div>

          <div className="login-error red text-align-center space-bottom-half"></div>
          <div className="flex">
                <button className="login-btn button flex-1-1-auto flex justify-content-center"
                            type="submit"><span className="flex-1 text-align-center" disabled={loading}>SIGN-IN</span>
                </button>
            {/* <button  >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button> */}
          </div>
          <div className="linear-activity space-bottom-half" >
                    <div className="indeterminate"></div>
                </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
      <div class="footer">
            AskMeAnything &copy; 2021
        </div>
    </div>
  );
};

export default Login;