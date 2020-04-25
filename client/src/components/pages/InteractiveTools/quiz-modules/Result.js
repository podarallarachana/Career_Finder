import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
<<<<<<< HEAD

function Result(props,{authorization: {user}}) {
=======
import store from '../../../../state-management/store';
>>>>>>> 7f2e28f63a416644c25c8fc9f05f33e53ff13850

    let questions = props.questions;
    questions.forEach(q => { q.isCorrect = q.options.every(x => x.selected === x.isAnswer); })

    let count = 0;
    const state = store.getState();
    const user = state.authorization.user;

    questions.forEach(q => {
        if (q.isCorrect)
            count++;
    })

    // Want count and user._id for adding to student record

    return (
        <div className="result">
            <h2 className="text-center font-weight-normal">How did you do?</h2>
            {questions.map((q, index) =>
                <div key={q.id} className={`mb-2 ${q.isCorrect ? 'bg-success' : 'bg-danger'}`}>
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
<<<<<<< HEAD
};

const mapStateToProps = (state) => ({
    authorization: state.authorization,
});

export default connect(mapStateToProps)(Result);
=======
  };
  
  const mapStateToProps = (state) => ({
    authorization: state.authorization,
  });
  
  export default connect(mapStateToProps)(Result);
>>>>>>> 7f2e28f63a416644c25c8fc9f05f33e53ff13850
