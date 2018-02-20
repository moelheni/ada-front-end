import React, { Component } from 'react'

export default class ContentViewLoader extends Component{
  render(){
    return(
      <div className="LessonItemMain loading">
        <div className="placeholderHolder" style={{width: "100%", marginRight: "20px"}}>
          <div className="animated-background" style={
            {
              height: "66px",
              width: "100%",
            }
          }>
          </div>
          <div className="animated-background" style={
            {
              height: "250px",
              width: "100%",
            }
          }>
          </div>
        </div>
      </div>
    )
  }
}
