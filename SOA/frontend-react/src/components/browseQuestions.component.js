import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import UserService from "../services/user.service";
import QuestionsService from "../services/questions.service";
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
  const [message, setMessage] = useState("");
  const [content, setContent] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    setDateTo("");
    setDateFrom("");
    setKeyword("");

    UserService.getPublicContent().then(
      (response) => {
        setAllQuestions(response.data);
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

  const handleChangeKeyword = (event) => setKeyword(event.target.value)

  const handleClear = () => {
    setDateTo("");
    setDateFrom("");
    setKeyword("");
    setMessage("");
    setContent(allQuestions);
  }

  const handleApply = () => {
    const stylesSuccess = {
      color: 'green',
      marginTop:'8px'
    }
    const stylesFail = {
      color: 'red',
      marginTop:'8px'
    }

    if (keyword && dateFrom && dateTo) {
      const startDate = dateFrom.split("-").join("");
      const endDate = dateTo.split("-").join("");
      setMessage(
        <div style={stylesSuccess}>
          Filters Applied!
        </div>
      );
      QuestionsService.filterQuestionsByKeywordAndDate(startDate, endDate, keyword).then(
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
      )

    }
    else if ((keyword && dateTo) || (keyword && dateFrom) || (!dateFrom && dateTo) || (dateFrom && !dateTo)) {
      setMessage(
        <div style={stylesFail}>
          Provide both dates.
        </div>
      )
    }      
    else if (keyword) {
      setMessage(
        <div style={stylesSuccess}>
          Filter Applied!
        </div>
      )
      QuestionsService.filterQuestionsByKeyword(keyword).then(
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
      )

    }
    else if (dateFrom && dateTo) {
      const startDate = dateFrom.split("-").join("");
      const endDate = dateTo.split("-").join("");

      QuestionsService.filterQuestionsByDate(startDate, endDate).then(
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
      )

    }
    else {
      setMessage(
        <div style={stylesFail}>
          No Filters Applied!
        </div>
      )
    }
  }

  return (
    <div className="browse-container">
      <div className="side-container">
        <div className="filter-container">
          <h2 id="filter-heading">Filter Questions By :</h2>
            <div className="filter-by-date-container">
              <h3>Date</h3>
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

            <div className="filter-by-keyword-container">
              <h3>Keyword</h3>
              <div>
                <input 
                  id="keyword-input"
                  onChange={handleChangeKeyword}
                  value={keyword}
                ></input>
              </div>
            </div>

            {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
            )}

            <div className="btns-container">
              <button className="submit-btn" onClick={handleApply}>
                Apply
              </button>
              <button className="cancel-btn" onClick={handleClear}>
                Clear
              </button>
            </div>
        </div>
      </div>

      <div className="questions-container">        
        {(typeof content == 'string') 
        ? content 
        : (
          (!content.length)
          ? 
          (<div className="loader">
          </div>)
          : (currentUser 
            ? (
            <ul className="questions-container">
              {content.map( (question) => 
                {
                  const {id,title,text,questionedOn,keywords} = question;
                  return (
                  <li key={id}>
                    <div id="question" >
                      <Link 
                        to={{pathname: "/answer/"+id}} 
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
                      <div><span className="small-caps">asked on: </span> {questionedOn}</div>
                    </div>
                  </li>);
                }
            )}
            </ul>
            ) : (
            <ul className="questions-container">
            {content.slice(0,10).map( (question) => 
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
                  <div><span className="small-caps">asked on: </span> {questionedOn}</div>
                </li>
                )
              }
            )}
            </ul>          
          ))
          )}
      </div>
    </div>
  );
};

export default Browse;