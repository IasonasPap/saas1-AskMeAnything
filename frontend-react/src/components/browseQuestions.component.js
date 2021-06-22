import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import UserService from "../services/user.service";
import "../styling/browseQuestions.css";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const Browse = ({currentUser}) => {
  const classes = useStyles();
  const [content, setContent] = useState([]);
  const [dateFrom,setDateFrom] = useState("2019-01-01");
  const [dateTo,setDateTo] = useState("2020-01-01");

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

  const handleChangeDateFrom = (event) => setDateFrom(event.target.value)

  const handleChangeDateTo = (event) => setDateTo(event.target.value)

  return (
    <div className="browse-container">
      <div className="side-stats">
        <div className="stats-container">
          <h1 className="stat">Questions</h1>
          <div>{content.length}</div>
          <h1 className="stat">Answers</h1>
          <div>2</div>
          <h1 className="stat">Users</h1>
          <div>3</div>
        </div>
      </div>
      <div className="questions-container">
        <div className="filter-container">
          <div>
            <h3>Filter By Date</h3>
          <div className="filter-by-date">
            <form className={classes.container} noValidate>
            <TextField
              id="date"
              label="Date from"
              type="date"
              className={classes.textField}
              value={dateFrom}
              onChange={handleChangeDateFrom}
              InputLabelProps={{
                shrink: true,
              }}
            />
            </form>
            <form className={classes.container} noValidate>
            <TextField
              id="date"
              label="Date to"
              type="date"
              className={classes.textField}
              value={dateTo}
              onChange={handleChangeDateTo}
              InputLabelProps={{
                shrink: true,
              }}
            />
            </form>
          </div>
          </div>
          <div className="filter-by-keyword">
            <h3>Filter By Date</h3>
            <div>
              <input></input>
            </div>
          </div>
        </div>
        <ul className="questions-container">
        {
        content.length && 
        (currentUser) ? 
        (content.map( (question) => 
            {
              const {id,title,text,questionedOn,keywords} = question;
              return (
              <li key={id}>
                <div id="question" >
                  <Link 
                    to={{pathname: "/answer/"+id, question}} 
                    className="answer-link"
                  >
                    <h2 className="title">{title}</h2>
                  </Link>
                  <div>{text}</div>
                  <ul className="keywords">
                    {
                      keywords.map(({word}) => 
                        <li>{word}</li>
                      )
                    }
                  </ul>
                  <div>asked on {questionedOn}</div>
                </div>
              </li>);
            }
          )
        ):(content.slice(0,10).map( (question) => 
            {
              const {id,title,text,questionedOn,keywords} = question;
              return ( 
              <li id="question" key={id}>
                <Link 
                    to={{pathname: "/answer/"+id, question}} 
                    className="answer-link"
                >
                  <h2>{title}</h2>
                </Link>
                <div>{text}</div>
                <ul className="keywords">
                  {
                    keywords.map((keyword) => {
                      <li>{keyword}</li>
                    })
                  }
                </ul>
                <div>asked on {questionedOn}</div>
              </li>
              )
            }
          )
        )}
        </ul>
      </div>
    </div>
  );
};

export default Browse;