import React, {Component} from 'react'

import { Link } from 'react-router-dom'

class LessonsListItem extends Component{
  constructor(props){
    super(props)
    this.state = {
      showSlidesList: false
    }
  }

  toggleSlides(){
    this.setState({
      showSlidesList: !this.state.showSlidesList
    })
  }
  render(){
    const lesson = this.props.lesson
    return(
      <div className={(this.props.showContinue)?"lessonItemWrapper":""}>
        <div className="lessonItemHolder">
          <div key={lesson.id} className={"lessonName" + ((!this.props.showContinue)?" clearsides" :"") }>
            <Link to={"/lessons/"+lesson.id}>
              {lesson.name}
              {
                !this.props.showContinue &&
                <span className="percent-title">({(Math.round(lesson.progress*100))+"%"})</span>
              }
            </Link>
            {
              this.props.showContinue &&
              <div className="progressHolder">
                  <div className="progress">
                    <div style={
                      {
                        width: (lesson.progress*100)+"%",
                        height: "100%",
                        backgroundColor: this.props.color
                      }
                    }></div>
                  </div>
                <span>{(Math.round(lesson.progress*100))+"%"}</span>
              </div>
            }
          </div>
          {
            this.props.showContinue &&
            <Link to={"/lessons/"+lesson.id}>
              <button className="btn btn-success btn-continue">
                Continue <i className="fa fa-angle-double-right"></i>
              </button>
            </Link>
          }
          {
            this.props.showContinue && !this.state.showSlidesList &&
            <i className="fa fa-angle-down show-more" onClick={ () => this.toggleSlides() }></i>
          }
          {
            this.state.showSlidesList &&
            <i className="fa fa-angle-up show-more" onClick={ () => this.toggleSlides() }></i>
          }
        </div>
        {
          this.state.showSlidesList &&
          <div className="slides-list">
            {
              lesson.slides.map((slide) => {
                return(
                  <div className="slide-item">
                    {
                      !slide.isRead &&
                      <i className="fa fa-circle-o"></i>
                    }
                    {
                      slide.isRead &&
                      <i className="fa fa-check-circle"></i>
                    }
                    <Link to={"/slides/"+slide.id}>
                      {
                        slide.name
                      }
                    </Link>
                  </div>
                )
              })
            }
          </div>
        }
      </div>
    )
  }
}

export default LessonsListItem
