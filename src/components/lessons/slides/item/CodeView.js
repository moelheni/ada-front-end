import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import NextBtn from './NextBtn'

class CodeView extends Component{
  constructor(props){
    super(props)
    if(window.localStorage.viewPref){
      this.state = {
        ...JSON.parse(window.localStorage.viewPref),
        expandView: false
      }
    }else {
      this.state = {
        expandView: false
      }
    }
  }

  render(){
    return(
      <div className="container fullScreen container-sandbox"> { /* Code View */ }
        <div className="row codesandbox-row">
          {
            !this.state.expandView &&
            <div className="col-md-4 no-margin no-padding">
              {
                typeof this.props.currentSlide.content != "undefined" &&
                <div className="lessonTitle floating-box">
                  <div>
                  <span>
                    {
                      (this.props.currentSlide.lesson)?
                      <span>
                        <Link to={"/subTracks/"+this.props.currentSlide.lesson.module.subTrackId+"/modules"}>...</Link>
                        {" / "}
                        <Link to={"/lessons/"+this.props.currentSlide.lesson.id}>...</Link>
                      </span>
                      :""
                    }
                    {" / "}
                  </span>
                  { this.props.currentSlide.name }
                  </div>
                </div>
              }
              <div className="lessonContentValue floating-box">
                <div className="content"
                  dangerouslySetInnerHTML={{__html: this.props.currentSlide.content}}>
                </div>

                <NextBtn independentNextBtn={false} />
              </div>
            </div>
          }
          <div
            className={"no-margin no-padding"+" col-md-"+((this.state.expandView)?12+" expandedView":8)}>
            <div className="floating-box codesandbox-box">
              {
                !this.state.expandView &&
                <div
                  className="expand"
                  onClick={() => this.setState({expandView: !this.state.expandView})}>
                  <i className="fa fa-angle-left"></i>
                </div>
              }
              {
                this.state.expandView &&
                <div
                  className="expand expanded"
                  onClick={() => this.setState({expandView: !this.state.expandView})}>
                  <i className="fa fa-angle-right"></i>
                </div>
              }
              <iframe
                src={ this.props.currentSlide.sandboxUrl || "https://codesandbox.io/embed/qkmmo818j"}
                width="100%"
                height={(window.innerHeight - 170)+"px"}>
              </iframe>
            </div>
          </div>
        </div>
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

const CodeViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeView)

export default CodeViewContainer;
