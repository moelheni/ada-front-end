import React, { Component } from 'react'
import { connect } from 'react-redux';

import CircularProgressBar from './CircularProgressBar';


import {
  goodJobPhrases,
  almostGoodJobPhrases,
  badJobPhrases
} from './phrases.js'

class QuizResult extends Component{
  constructor(props) {
    super(props)
  }

  render(){
    return(
      <div>
        {
          this.props.quizzes.length > 0 &&
          <div className="quiz-result">
            <div className="quiz-score">
              <span>
                {
                  this.props.quizzes[this.props.quizId].quizResults[0].score == 1 &&
                  goodJobPhrases[parseInt(Math.random()*goodJobPhrases.length)]
                }
                {
                  this.props.quizzes[this.props.quizId].quizResults[0].score >= 0.8 &&
                  this.props.quizzes[this.props.quizId].quizResults[0].score != 1 &&
                  almostGoodJobPhrases[parseInt(Math.random()*almostGoodJobPhrases.length)]
                }
                {
                  this.props.quizzes[this.props.quizId].quizResults[0].score < 0.8 &&
                  badJobPhrases[parseInt(Math.random()*badJobPhrases.length)]
                }
              </span>
              <span>
                <div className="score-value">
                  <CircularProgressBar
                    strokeWidth="10"
                    sqSize="200"
                    color={(this.props.quizzes[this.props.quizId].quizResults[0].score < 0.8?"#e74c3c":"default")}
                    percentage={Math.round(this.props.quizzes[this.props.quizId].quizResults[0].score * 100)}/>
                </div>
              </span>
            </div>
            <div className="result-answers">
              {
                this.props.quizzes[this.props.quizId].questions.map( (question) => {
                  return(
                    <div className={ "result-item " + ( question.isCorrect? "correct" : "wrong" ) }>
                      <span className="result-icon">
                        {
                          question.isCorrect &&
                          <i className="fa fa-check" />
                        }
                        {
                          !question.isCorrect &&
                          <i className="fa fa-times" />
                        }
                      </span>
                      {
                        question.content+ " "
                      }
                      (Correct answer(s):{" "}
                        {
                          question.
                            choices.
                            filter( e => e.isCorrect ).
                            map( e=> e.content ).
                            join(", ")
                        }
                      )
                    </div>
                  )
                })
              }
            </div>
          </div>

        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    quizzes: state.quizzes
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}


const QuizResultContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizResult)

export default QuizResultContainer;
