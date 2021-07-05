import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const {children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: 50,
  },
}));

export default function FullWidthTabs({ myQuestions}) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="My Questions" {...a11yProps(0)} />
          <Tab label="My Answers" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        {myQuestions.map( (question) => 
            {
              const {id,title,text,questionedOn,keywords,answers} = question;
              return (
              <li key={id}>
                <div id="question" >
                  <div className="edit-container">
                    <Link 
                      to={{pathname: "/answer/"+id}} 
                      className="answer-link"
                    >
                      <h2 className="title">{title}</h2>
                    </Link>
                    <Link 
                      to={{pathname: "/edit/"+id, question}} 
                      className="answer-link">
                      <i className='fas fa-pen' style={{fontSize:"20px",color:"grey"}}>edit</i>
                    </Link>                  
                  </div>
                  
                  <div>{text}</div>
                  <ul className="keywords">
                    {
                      keywords.map(({word}) => 
                        <li>{word}</li>
                      )
                    }
                  </ul>
                  <div><span className="small-caps">answered on: </span> {questionedOn}</div>
                  
                </div>
                <h2>Answers({answers.length})</h2>
                {answers.length ?
                  (<ul>                    
                      {answers.map(({text,answeredOn}) => 
                        <li className="answer">
                          <div className="answer-text">{text}</div>
                          <div><span className="small-caps">asked on: </span> {answeredOn}</div>
                        </li>
                      )}
                  </ul>
                  ):(
                    []
                  )
                  }
              </li>);
            }
          )}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          A
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
