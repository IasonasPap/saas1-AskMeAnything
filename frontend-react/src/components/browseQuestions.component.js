import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import UserService from "../services/user.service";
import "../styling/browseQuestions.css";

const Browse = ({currentUser}) => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="q-container">
      <header className="jumbotron">
        <ul className="questions-container">
        {currentUser ? 
        (content.map( ({id,title,text,questionedOn}) => 
            <li key={id}>
              <div id="question" >
                <Link 
                  to={{pathname: "/answer/"+id, question:{title,text}}} 
                  className="answer-link"
                >
                  <h2>{title}</h2>
                </Link>
                <div>{text}</div>
                <div>Asked on {questionedOn}</div>
              </div>
            </li>
          )
        ):(
          content.slice(0,10).map( ({id,title,text,questionedOn}) => 
            <li id="question" key={id}>
              <Link 
                  to={{pathname: "/answer/"+id, question:{title,text}}} 
                  className="answer-link"
              >
                <h2>{title}</h2>
              </Link>
              <div>{text}</div>
              <div>Asked on {questionedOn}</div>
            </li>
          )
        )}
        </ul>
      </header>
    </div>
  );
};

export default Browse;