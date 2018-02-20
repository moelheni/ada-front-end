import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import NextBtn from './NextBtn'

class ContentView extends Component{
  render(){
    return (
      <div className="LessonItemMain"> { /* Lesson View */ }
        {
          typeof this.props.currentSlide.content != "undefined" &&
          <div className="lessonTitle floating-box">
            <div>
            <span>
              {
                (this.props.currentSlide.lesson)?
                  <span>
                    <Link
                      to={"/subTracks/"+this.props.currentSlide.lesson.module.subTrackId+"/modules"}>
                        {this.props.currentSlide.lesson.module.name}
                    </Link>
                    {" "}<i className="fa fa-angle-right"></i>{" "}
                    <Link
                      to={"/lessons/"+this.props.currentSlide.lesson.id}>
                      {this.props.currentSlide.lesson.name}
                    </Link>
                  </span>
                  : ""
              }
              {" "}/{" "}
            </span>
            { this.props.currentSlide.name }
            </div>
          </div>
        }
        {
          typeof this.props.currentSlide.content != "undefined" &&
          <div className="lessonContentValue floating-box">
            <div className="content"
              dangerouslySetInnerHTML={{__html: this.props.currentSlide.content}}>
            </div>
          </div>
        }
        {
          typeof this.props.currentSlide.content != "undefined" &&
          <NextBtn independentNextBtn={true} />
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentSlide: state.currentSlide
  }
}

const mapDispatchToProps = dispatch => {

}

const ContentViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentView)

export default ContentViewContainer;
