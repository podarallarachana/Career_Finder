import React from "react";
import quizWindow from "./helpers";
import './QuizApp.css';
import store from '../../../state-management/store';
import { CHANGE_CAREER } from "../../../state-management/actions/constants";

const GotoQuiz = (props) => {
    store.dispatch({type: CHANGE_CAREER, payload: props.code});

    return (
        <div class="quiztabcontainer">
            <div class="quiztab">
                <button class="quizbutton" onClick={quizWindow}>Click to start the Exploration Experience</button>
            </div>
        </div>
    )
}

export default GotoQuiz;