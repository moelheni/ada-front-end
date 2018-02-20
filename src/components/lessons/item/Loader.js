import React, { Component } from 'react'

export default class Loader extends Component{
  render(){
    return(
      <div className="fullScreen container loading codesandbox-loading">
        <div className="placeholderHolder" style={{width: "calc(100% - 390px)", marginRight: "20px"}}>
          <div className="animated-background" style={
            {
              height: "66px",
              width: "100%",
              marginRight: "0",
              marginLeft: "0",
            }
          }>
          </div>
          <div className="animated-background" style={
            {
              height: "250px",
              width: "100%",
              marginRight: "0",
              marginLeft: "0",
            }
          }>
          </div>
        </div>
        <div className="animated-background" style={
          {
            height: "150px",
            width: "350px",
            marginRight: "20px",
            marginLeft: "0px",
          }
        }>
        </div>
      </div>
    )
  }
}
