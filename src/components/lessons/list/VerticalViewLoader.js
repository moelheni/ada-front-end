import React, { Component } from 'react'

export default class VerticalViewLoader extends Component{
  render(){
    return(
      <div className="loading loading-horizontal">
        <div className="animated-background" style={
          {
            height: "200px",
            width: "calc(33.33333% - 20px)",
            marginLeft: "0",
            marginRight: "0"
          }
        }>
        </div>
        <div className="animated-background" style={
          {
            height: "200px",
            width: "calc(33.33333% - 20px)",
            marginLeft: "0",
            marginRight: "0"
          }
        }>
        </div>
        <div className="animated-background" style={
          {
            height: "200px",
            width: "calc(33.33333% - 20px)",
            marginLeft: "0",
            marginRight: "0"
          }
        }>
        </div>
      </div>
    )
  }
}
