import React from 'react';

import "../styling/askQuestion.css";

export default function Question(props) {
  const [title, setTitle] = React.useState('');
  const [text, setText] = React.useState('');
  const [keywords, setKeywords] = React.useState('');

  const [submitted,setSubmitted] = React.useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleKeywordsChange = (event) => {
    setKeywords(event.target.value);
  };

  const handleSubmit = (event) => {
    console.log("Form Submitted!");
    setSubmitted(true);
  }

  return (
    <div class="ask-question-container">
    { submitted ? (
      <div>
        <h4>Question Submitted Succesfully</h4>
        <button onClick={() => setSubmitted(false)}>New Question</button>
      </div>
    ):(
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <div>
        <label>Question Title:</label>
        <textarea
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={2}
          variant="outlined"
          onChange={handleTitleChange}
          value={title}
        />
        <label>Question Text:</label>
        <textarea
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={10}
          variant="outlined"
          onChange={handleTextChange}
          value={text}
        />
        <label>Keywords:</label>
        <textarea
          id="outlined-multiline-static"
          label="Multiline"
          placeholder="Keywords seperated with commas"
          multiline
          rows={2}
          onChange={handleKeywordsChange}
          value={keywords}
          variant="outlined"
        />
      </div>

      <button>
        <span>Submit</span>
      </button>
      <button onClick={()=> {
          props.history.push("/home");
          window.location.reload();}}>
        <span>Cancel</span>
      </button>
    </form>)
    }
    </div>
  );
}