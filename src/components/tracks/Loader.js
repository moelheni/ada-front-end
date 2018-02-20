import React, { Component } from 'react'

export default class Loader extends Component{
  render(){
    return(
      <div className="loading TracksList container">
        <div className="animated-background" style={
          {
            height: "250px",
            width: "calc(50% - 20px)",
            marginLeft: "0",
            marginRight: "0",
          }
        }>
        </div>
        <div className="animated-background" style={
          {
            height: "250px",
            width: "calc(50% - 20px)",
            marginLeft: "0",
            marginRight: "0",
          }
        }>
        </div>
      </div>
    )
  }
}
