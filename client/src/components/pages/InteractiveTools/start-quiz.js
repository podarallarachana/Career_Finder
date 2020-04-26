import React from "react";
<<<<<<< HEAD
import "./QuizApp.css";
import store from "../../../state-management/store";
import { CHANGE_CAREER } from "../../../state-management/actions/constants";

const GotoQuiz = (props) => {
  store.dispatch({ type: CHANGE_CAREER, payload: props.code });
=======
import './QuizApp.css';
//import store from '../../../state-management/store';
//import { CHANGE_CAREER } from "../../../state-management/actions/constants";

const GotoQuiz = (props) => {
    //store.dispatch({type: CHANGE_CAREER, payload: props.code});

    /*const openQuiz = (color) => {
        let newWindow = window.open("/quiz","", "height=650,width=1080");
        newWindow.document.body.style.background = color;
    }*/
>>>>>>> 75c47cc4bb8f96809723c4bdcf4c02820f264d68

  const quizWindow = () => {
    window.open("/quiz", "", "height=650,width=1080");
  };

  return (
    <div class="quiztabcontainer">
      <div class="quiztab">
        <button class="quizbutton" onClick={quizWindow}>
          Click to start the Exploration Experience
        </button>
      </div>
    </div>
  );
};

export default GotoQuiz;
