import React from "react";

const GotoQuiz = () => {
    const quizURL = '/quiz';

    return (
    <div>
        <button onClick={() => window.open(quizURL)}>Start Quiz</button>
    </div>
    )
}

export default GotoQuiz;