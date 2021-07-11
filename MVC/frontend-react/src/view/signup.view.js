import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../controller/auth.controller";
import "../styling/signup.css";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeFullname = (e) => {
    const fullname = e.target.value;
    setFullname(fullname);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password, fullname).then(
        (response) => {
          setMessage(`${response.data.username} succesfully signed up!`);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="auth page font-lgr">
        <h1 id="title">Ask Me Anything</h1>
        <div className="auth-box flex flex-direction-column justify-content-center align-items-center">

        <Form name="loginForm" onSubmit={handleRegister} ref={form} novalidate>
          {!successful && (
            <div>
              <div className="flex input-container">
                <label htmlFor="username">Username</label>
                <Input
                  id="username"
                  placeholder="Username"
                  type="text"
                  className="flex-1-1-auto font-lgr"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="flex input-container">
                <label htmlFor="fullname">Fullname</label>
                <Input
                  id="fullname"
                  placeholder="Fullname"
                  type="text"
                  className="flex-1-1-auto font-lgr"
                  name="fullname"
                  value={fullname}
                  onChange={onChangeFullname}
                  validations={[required]}
                />
              </div>

              <div className="flex input-container">
                <label htmlFor="email">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="flex-1-1-auto font-lgr"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="flex input-container">
                <label htmlFor="password">Password</label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="login-error red text-align-center space-bottom-half" ></div>
                <div className="flex">
                    <button className="login-btn button flex-1-1-auto flex justify-content-center"
                            type="submit" ><span className="flex-1 text-align-center">SIGN-UP</span>
                    </button>
                </div>
                {/* <div className="linear-activity space-bottom-half" >
                    <div className="indeterminate"></div>
                </div> */}
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={ successful ? "success" : "alert" }
                role="alert"
              >
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

export default Register;