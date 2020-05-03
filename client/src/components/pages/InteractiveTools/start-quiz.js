<<<<<<< HEAD
// import React from "react";
// import './QuizApp.css';
// //import store from '../../../state-management/store';
// //import { CHANGE_CAREER } from "../../../state-management/actions/constants";

// const GotoQuiz = (props) => {
//   //store.dispatch({type: CHANGE_CAREER, payload: props.code});

//   /*const openQuiz = (color) => {
//       let newWindow = window.open("/quiz","", "height=650,width=1080");
//       newWindow.document.body.style.background = color;
//   }*/

//   const quizWindow = () => {
//     window.open("/quiz", "", "height=650,width=1080");
//   }

//   return (
//     div className="quiztabcontainer"
//   div className="quiztab"
//   button className="quizbutton" onClick = { quizWindow }Click to start the Exploration Experience / button
//     / div
//     / div
//     )
// }

// export default GotoQuiz;
=======
import React from "react";
import './QuizApp.css';
//import store from '../../../state-management/store';
//import { CHANGE_CAREER } from "../../../state-management/actions/constants";
const GotoQuiz = (props) => {
    //store.dispatch({type: CHANGE_CAREER, payload: props.code});
    /*const openQuiz = (color) => {
        let newWindow = window.open("/quiz","", "height=650,width=1080");
        newWindow.document.body.style.background = color;
    }*/
    const quizWindow = () => {
        window.open("/quiz","", "height=650,width=1080");
    }
    return (
        <div class="quiztabcontainer">
            <div class="quiztab">
                <button class="quizbutton" onClick={quizWindow}>Click to start the Exploration Experience</button>
            </div>
        </div>
    )
}
export default GotoQuiz;
>>>>>>> 92ba8818dd3c48615785cb86a1fe2277672a224b
