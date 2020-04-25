import React from "react";
import quizWindow from "./helpers";
import "./QuizApp.css";

const GotoQuiz = (props) => {
  //console.log("props.code: ", props.code);

  return (
    <div className="quiztabcontainer">
      <div className="quiztab">
        <button className="quizbutton" onClick={quizWindow}>
          Click to start the Exploration Experience
        </button>
      </div>
    </div>
  );
};

export default GotoQuiz;
