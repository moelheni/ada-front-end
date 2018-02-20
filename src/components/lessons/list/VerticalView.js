import React, { Component } from 'react';

import LessonsList from './LessonsList'
import VerticalViewLoader from './VerticalViewLoader'

class VerticalView extends Component{
  render(){
    return (
      <div className="VerticalViewLessons">
      {
        this.props.modules.loading &&
        <VerticalViewLoader />
      }
      {
        !this.props.modules.loading &&
          this.props.modules.map( (module) => {
            return (
              <div className="lesson floating-box">
                <LessonsList lessons={module.lessons} showContinue={false} />
                <div className="bottom-title" style={{background: module.color}}>
                  { module.name }
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}


export default VerticalView
