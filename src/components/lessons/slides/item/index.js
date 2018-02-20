// this component shares a lot of style with /lessons/item component
// if you don't find some tyle in ./style.css search for it in /lessons/item/style.css



import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom'
import SlidesList from '../list'
import { updateCurrentSlide }  from '../../../../actions'
import ErrorComponent from '../../../error'
import ReactLoading from 'react-loading';

import ContentView from './ContentView'
import ContentViewLoader from './ContentViewLoader'
import CodeView from './CodeView'
import CodeViewLoader from './CodeViewLoader'
import NextBtn from './NextBtn'


import './style.css'

class SlideItemComp extends Component{
  constructor(props){
    super(props)
    this.slide_id = props.match.params.id
    this.props.updateSlide(this.slide_id)
    if(window.localStorage.viewPref){
      this.state = {
        ...JSON.parse(window.localStorage.viewPref),
        redirect: false
      }
    }else {
      this.state = {
        viewCode: false,
        redirect: false
      }
    }

  }

  componentWillUpdate(props, state){
    this.slide_id = props.match.params.id
    if (typeof this.props.currentSlide.id != "undefined" && this.slide_id != this.props.currentSlide.id){
      this.props.updateSlide(this.slide_id)
    }
  }

  nextSlideId(){
    let nextSlides = this.props.currentSlide.lesson.slides.filter((e) => e.orderIndicator > this.props.currentSlide.orderIndicator)
    if(nextSlides.length > 0 ){
      return nextSlides[0].id
    }
    return -1
  }

  setState(obj){
    super.setState(obj)
    let state = { ...this.state, ...obj }
    window.localStorage.viewPref = JSON.stringify(state)
  }

  componentDidUpdate(){
    let $this = ReactDOM.findDOMNode(this);
    let codes = $this.getElementsByTagName("code")
    for(let i = 0; i < codes.length; i ++){
      window.hljs.highlightBlock(codes[i]);
    }
  }

  render(){
    return(
      <div>
        {
          typeof this.props.currentSlide.content != "undefined" && this.state.redirect &&
          this.props.currentSlide.lesson.quizzes.length > 0 &&
          <Redirect to={"/lessons/" + this.props.currentSlide.lesson.id + "/quiz/0"} />
        }
        {
          typeof this.props.currentSlide.content != "undefined" && this.state.redirect &&
          this.props.currentSlide.lesson.quizzes.length == 0 &&
          <Redirect to={"/subTracks/"+this.props.currentSlide.lesson.module.subTrackId+"/modules"} />
        }
        {
          this.props.currentSlide.error &&
          <div className="container">
            <ErrorComponent />
          </div>
        }
        {
          typeof this.props.currentSlide.error == "undefined" && this.props.currentSlide.sandboxUrl &&
          <div className="container fullScreen switchSlideViewHolder">
            <div className="switchSlideView" onClick={() => this.setState({viewCode: !this.state.viewCode})}>
              <div className={
                (!this.state.viewCode)? "active" : ""
              }>
                <i className="fa fa-list"></i>
              </div>
              <div className={
                (this.state.viewCode)? "active" : ""
              }>
                <i className="fa fa-code"></i>
              </div>
            </div>
          </div>
        }
        {
          this.props.currentSlide.loading && this.state.viewCode && this.props.currentSlide.sandboxUrl &&
          <CodeViewLoader />
        }
        {
          typeof this.props.currentSlide.content != "undefined" && this.state.viewCode && this.props.currentSlide.sandboxUrl &&
          <CodeView />
        }
        <div className="LessonItem container fullScreen">
          {
            this.props.currentSlide.loading && (!this.state.viewCode || !this.props.currentSlide.sandboxUrl) &&
            <ContentViewLoader />
          }
          {
            !this.props.currentSlide.error && (!this.state.viewCode || !this.props.currentSlide.sandboxUrl) && !this.props.currentSlide.loading &&
            <ContentView />
          }

          {
            !this.props.currentSlide.error && (!this.state.viewCode || !this.props.currentSlide.sandboxUrl) &&
            <SlidesList />
          }
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
  return {
    updateSlide: id => {
      dispatch(updateCurrentSlide(id))
    }
  }
}

const SlideItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(SlideItemComp)

export default SlideItem;
