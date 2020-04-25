import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

function Result(props,{authorization: {user}}) {

    let questions = props.questions;
    questions.forEach(q => { q.isCorrect = q.options.every(x => x.selected === x.isAnswer); })

    let count = 0;

    return (
        <div className="result">
            <h2 className="text-center font-weight-normal">How did you do?</h2>
            {questions.map((q, index) =>
                <div key={q.id} className={`mb-2 ${q.isCorrect ? 'bg-success' : 'bg-danger'}`}>
                    {q.isCorrect ? (count++) : null}
                    <div className="result-question">
                        <h5>{index + 1}. {q.name}</h5>
                        <div className="row">
                            {
                                q.options.map(option =>
                                    <div key={option.id} className="col-6">
                                        <input id={option.id} type="checkbox" disabled="disabled" checked={option.selected} /> {option.name}
                                    </div>
                                )
                            }
                        </div>
                        <div className={`m-1 p-1 text-bold ${q.isCorrect ? 'text-success' : 'text-danger'}`}>{q.isCorrect ? 'Correct' : 'So close'}!</div>
                    </div>
                </div>
            )}
            <h4 className="alert alert-info text-center">You got {count} / {questions.length} answers correct!</h4>
        </div>
    )
}

Result.propTypes = {
    authorization: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    authorization: state.authorization,
});

export default connect(mapStateToProps)(Result);