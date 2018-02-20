import React, { Component } from 'react'

export default class CodeViewLoader extends Component{
  render(){
    return(
      <div className="fullScreen container loading codesandbox-loading">
        <div className="placeholderHolder" style={{width: "calc(33.3333% - 20px)", marginRight: "20px"}}>
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
        <div className="animated-background" style={
          {
            height: "450px",
            width: "66.66666%",
            marginRight: "0"
          }
        }>
        </div>
      </div>
    )
  }
}
