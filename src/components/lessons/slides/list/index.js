import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import { Link } from 'react-router-dom'

import './style.css'

import { markSlideAsRead } from '../../../../actions'

class SlidesListComp extends Component{
  constructor(props){
    super(props)
  }

  renderSlide(slide, index){
    return(
      <Link to={"/slides/"+slide.id}>
        <span>{index+1}- {slide.name}</span>
        {
          slide.isRead &&
          <i className="fa fa-check-circle"></i>
        }
        {
          !slide.isRead &&
          <i onClick={() => this.props.markSlideAsRead(slide.id)} className="fa fa-circle-o"></i>
        }
      </Link>
    )
  }

  render(){
    return(
      <div className="lessonSidebar">
        {
          this.props.slides.loading &&
          <div className="loading">
            <div className="animated-background" style={
              {
                height: "150px",
                width: "100%",
              }
            }>
            </div>
          </div>
        }
        {
          !this.props.slides.loading &&
          <div className="lessonSidebar floating-box">
            <ul className="SlidesList">
              {
                this.props.slides &&
                this.props.slides.map( (slide, index) => {
                  return (
                    <div key={slide.id}>
                    {
                      slide.id == this.props.currentSlide.id &&
                      <li className="active">
                        { this.renderSlide(slide, index) }
                      </li>
                    }
                    {
                      slide.id != this.props.currentSlide.id &&
                      <li>
                        { this.renderSlide(slide, index) }
                      </li>
                    }
                    </div>
                  )
                })
              }
              {
                this.props.quizzes &&
                this.props.quizzes.length > 0 &&
                this.props.quizzes.map( (quiz, index) => {
                  return (
                    <div key={quiz.id}>
                      <li>
                      <Link to={"/lessons/"+quiz.lessonId+"/quiz/0"}>
                        <span>Quiz</span>
                        {
                          quiz.isDone &&
                          <i className="fa fa-check-circle"></i>
                        }
                        {
                          !quiz.isDone &&
                          <i className="fa fa-circle-o"></i>
                        }
                        </Link>
                      </li>
                    </div>
                  )
                })
              }
            </ul>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    slides: state.slides,
    currentSlide: state.currentSlide,
    quizzes: state.quizzes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    markSlideAsRead: id => {
      dispatch(markSlideAsRead(id))
    }
  }
}


const SlidesList = connect(
  mapStateToProps,
  mapDispatchToProps
)(SlidesListComp)

export default SlidesList;
