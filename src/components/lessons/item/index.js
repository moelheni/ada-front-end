import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom'
import SlidesList from '../slides/list'
import ReactLoading from 'react-loading';
import { updateCurrentLesson } from '../../../actions'
import ErrorComponent from '../../error'
import "./style.css"

import Loader from './Loader'

class LessonItemComp extends Component{
  constructor(props){
    super(props)
    this.lesson_id = props.match.params.id
    this.state = {
      loading: true
    }
    this.props.updateLesson(this.lesson_id)
  }

  componentWillReceiveProps(props){
    if (this.lesson_id != props.match.params.id) {
      this.lesson_id = props.match.params.id
      this.props.updateLesson(this.lesson_id)
    }
    if (props.currentLesson && !props.currentLesson.loading) {
      this.setState({
        loading: false
      })
    } else {
      this.setState({
        loading: true
      })
    }
  }

  render(){
    return(
      <div>

      {
        this.props.currentLesson.error &&
        <div className="container">
          <ErrorComponent />
        </div>
      }
      {
        this.props.currentLesson.loading &&
        <Loader />
      }
      {
        !this.props.currentLesson.error && !this.state.loading &&
        <div className="LessonItem container fullScreen">
          <div className="LessonItemMain">
            {
              typeof this.props.currentLesson.slides != "undefined" &&
              <div className="lessonTitle floating-box">
                {
                  (this.props.currentLesson.content == "" || !this.props.currentLesson.content) &&
                  <Redirect to={"/slides/"+this.props.currentLesson.slides[0].id} />
                }
                <div className="titleValue">
                  <span>
                  { (this.props.currentLesson.module)?
                    <Link to={"/subTracks/"+this.props.currentLesson.module.subTrackId+"/modules"}>{this.props.currentLesson.module.name}</Link>:""}
                  {" "}<i className="fa fa-angle-right"></i>{" "}
                  </span>
                  { this.props.currentLesson.name }
                </div>
                <Link to={"/slides/"+this.props.currentLesson.slides[0].id}>
                  <div className="playBtn">
                    <i className="fa fa-play"></i>
                  </div>
                </Link>
              </div>
            }
            {
              typeof this.props.currentLesson.slides != "undefined" &&
              <div className="lessonContent floating-box">
                <div className="lessonContentValue">
                  <div className="content" dangerouslySetInnerHTML={{__html: this.props.currentLesson.content}}></div>
                </div>
              </div>
            }
            {
              false && typeof this.props.currentLesson.slides != "undefined" &&
              <div className="lessonContent floating-box">
                <header>
                  Feedback
                </header>
                <div className="lessonContentValue">
                  {
                    // Feedback
                  }
                </div>
              </div>
            }

          </div>

          <SlidesList />
        </div>
      }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentLesson: state.currentLesson
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateLesson: id => {
      dispatch(updateCurrentLesson(id))
    }
  }
}


const LessonItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(LessonItemComp)

export default LessonItem;
