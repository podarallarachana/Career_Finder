import React from "react";
import quizWindow from "./helpers";
import './QuizApp.css';

const GotoQuiz = (props) => {
    //console.log("props.code: ", props.code);

    return (
        <div class="quiztabcontainer">
            <div class="quiztab">
                <button class="quizbutton" onClick={quizWindow}>Click to start the Exploration Experience</button>
            </div>
        </div>
    )
}

export default GotoQuiz;