import React, { Component } from 'react';
import { ActionTypes } from '../../../../state-management/actions/constants';
import Review from './Review';
import Questions from './Questions';
import Result from './Result';
import { connect } from 'react-redux';

const mapStateToProps = state => { return { ...state.quiz, ...state.mode, ...state.pager } };

const mapDispatchToProps = dispatch => ({
    onSubmit: payload => dispatch({ type: ActionTypes.QuizSubmit, payload }),
    onPagerUpdate: payload => dispatch({ type: ActionTypes.PagerUpdate, payload })
});

class Quiz extends Component {
    move = (e) => {
        let id = e.target.id;
        let index = 0;
        if (id === 'first')
            index = 0;
        else if (id === 'prev')
            index = this.props.pager.index - 1;
        else if (id === 'next')
            index = this.props.pager.index + 1;
        else if (id === 'last')
            index = this.props.pager.count - 1;
        else
            index = parseInt(e.target.id, 10);

        if (index >= 0 && index < this.props.pager.count) {
            let pager = {
                index: index,
                size: 1,
                count: this.props.pager.count
            };
            this.props.onPagerUpdate(pager);
        }
    }

    setMode = (e) => this.props.onSubmit(e.target.id);

    renderMode() {
        if (this.props.mode === 'quiz') {
            return (<Questions move={this.move} />)
        } else if (this.props.mode === 'review') {
            return (<Review quiz={this.props.quiz} move={this.move} />)
        } else {
            return (<Result questions={this.props.quiz.questions || []}
                            quizNum={this.props.quiz.id}
                    />)
        }
    }

    render() {
        return (
            <div>
                {this.renderMode()}
                {(this.props.mode !== 'submit') &&
                    <div>
                        <hr />
                        <button id="quiz" className="btn btn-info" onClick={this.setMode}>Exploration Questions</button>
                        <button id="review" className="btn btn-info" onClick={this.setMode}>Exploration Check</button>
                        <button id="submit" className="btn btn-primary" onClick={this.setMode}>Answer Check</button >
                    </div >}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);