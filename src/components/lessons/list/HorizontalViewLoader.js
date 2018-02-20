import React, { Component } from 'react'

export default class HorizontalViewLoader extends Component{
  render(){
    return(
      <div className="loading">
        <div className="animated-background" style={
          {
            height: "150px",
            width: "100%",
            marginLeft: "0",
            marginRight: "0",
            marginBottom: "0"
          }
        }>
        </div>
        <div className="animated-background" style={
          {
            height: "150px",
            width: "100%",
            marginLeft: "0",
            marginRight: "0"
          }
        }>
        </div>
      </div>
    )
  }
}
