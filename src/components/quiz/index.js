import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import SlidesList from '../lessons/slides/list'
import QuizResult from './QuizResult';

import "./style.css"

import { updateCurrentLesson, answerQuiz } from '../../actions'

class Quiz extends Component{
  constructor(props){
    super(props)
    this.lesson_id = props.match.params.id
    this.props.updateLesson(this.lesson_id)
    let quizId = props.match.params.quiz_id
    this.quizId = quizId

    this.state = {
      currentQuestion: {},
      selectedChoices: []
    }
  }

  componentWillReceiveProps(props){
    let quizId = props.match.params.quiz_id
    console.log(props.quizzes)
    if (props.quizzes.length > 0) {
      let quiz = props.quizzes[quizId].questions.filter((e) => !e.isAnswered)
      let firstcurrentQuestion = quiz[0]

      this.setState({
        currentQuestion: firstcurrentQuestion
      })
      if (quiz.length == 0) {
        this.setState({
          quizDone: true
        })
      }
    }
  }

  componentDidMount(){
    let $this = ReactDOM.findDOMNode(this);
    let codes = $this.getElementsByTagName("code")
    for(let i = 0; i < codes.length; i ++){
      window.hljs.highlightBlock(codes[i]);
    }
  }

  selectOption(i, id){
    let currentQuestion = this.state.currentQuestion
    let selectedChoices = this.state.selectedChoices
    let index = selectedChoices.indexOf(id)
    if ( index == -1) {
      selectedChoices.push(id)
    } else {
      selectedChoices.splice(index, 1);
    }
    currentQuestion.choices[i].selected = !currentQuestion.choices[i].selected
    this.setState({
      currentQuestion,
      selectedChoices
    })
  }

  nextQuestion(){
    if (this.state.selectedChoices.length > 0) {
      this.state.selectedChoices.map((e) => this.props.answerQuiz(e))

      let currentQuestion = this.state.currentQuestion
      let quizId = this.props.match.params.quiz_id
      let nextQuestions = this.props.quizzes[quizId].questions.filter((e) => e.id > currentQuestion.id)
      if (nextQuestions.length > 0) {
        this.setState({
          currentQuestion: nextQuestions[0],
          selectedChoices: []
        })
      } else {
        this.setState({
          quizDone: true
        })
      }
    }
  }

  render(){
    return(
      <div className="quiz-holder LessonItem fullScreen container">
        <div className="LessonItemMain">
          <div className="quiz floating-box">
            {
              this.props.quizzes.loading &&
              <h1>loading</h1>
            }
            {
              (
                !this.props.quizzes.loading &&
                this.state.quizDone
              ) &&
              <QuizResult quizId={ this.quizId } />
            }
            {
              !this.props.quizzes.loading &&
              this.state.currentQuestion &&
              !this.state.quizDone &&
              this.props.quizzes.length > 0 &&
              <div>
                <section className="question">
                  <h1>{ this.state.currentQuestion.content }</h1>
                </section>
                <ul className="options">
                  {
                    this.state.currentQuestion.choices &&
                    this.state.currentQuestion.choices.map( (e, i) => {
                      return(
                        <li onClick={ () => this.selectOption(i, e.id) } className={ (e.selected)? "active" : "" }>
                          <span>
                            {
                              String.fromCharCode(65 + i)
                            }
                          </span>
                          {
                            e.content
                          }
                        </li>
                      )
                    })
                  }
                </ul>
                <section className="actions">
                  <button className="btn btn-success" onClick={ () => this.nextQuestion() }>
                    Next <i className="fa fa-angle-right" />
                  </button>
                </section>
              </div>
            }
          </div>
        </div>
        <SlidesList />
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
    updateLesson: id => {
      dispatch(updateCurrentLesson(id))
    },
    answerQuiz: id => {
      dispatch(answerQuiz(id))
    }
  }
}


const QuizContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz)

export default QuizContainer;
