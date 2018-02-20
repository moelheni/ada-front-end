import React, { Component } from 'react';

import LessonsList from './LessonsList'
import HorizontalViewLoader from './HorizontalViewLoader'
class HorizontalView extends Component{
  render(){
    return (
      <div className="HorizontalViewLessons">
        {
          this.props.modules.loading &&
          <HorizontalViewLoader />
        }
        {
          !this.props.modules.loading &&
          this.props.modules.map( (module) => {
            return (
              <div key={module.id} className="lesson floating-box">
                <div className="left-section" style={{background: module.color}}>
                  <div>{ module.name.replace("-","") }</div>
                </div>
                <div className="right-section">
                  <LessonsList lessons={module.lessons} color={module.color} showContinue={true} />
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}


export default HorizontalView
