import React, { Component } from 'react'
import { markSlideAsRead } from '../../../../actions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

class NextBtn extends Component {
  markAsRead(redirect){
    this.props.markSlideAsRead(this.props.currentSlide.id)
    if(redirect){
      this.setState({
        redirect: true
      })
    }
  }

  nextSlideId(){
    let nextSlides = this.props.currentSlide.lesson.slides.filter((e) => e.orderIndicator > this.props.currentSlide.orderIndicator)
    if(nextSlides.length > 0 ){
      return nextSlides[0].id
    }
    return -1
  }
  render(){
    return(
      <div className={"NextBtnHolder "+ ((this.props.independentNextBtn)?"independentNextBtn":"")}>
        {
          !this.props.currentSlide.loading &&
          this.nextSlideId() != -1 &&
          <Link to={"/slides/"+this.nextSlideId()} onClick={() => this.markAsRead()}>
            <button className="NextBtn">
              Next
              <i className="fa fa-play"></i>
            </button>
          </Link>
        }
        {
          !this.props.currentSlide.loading &&
          this.nextSlideId() == -1 &&
          <button className="NextBtn" onClick={() => this.markAsRead(true)}>
            Done
            <i className="fa fa-check"></i>
          </button>
        }
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
    markSlideAsRead: id => {
      dispatch(markSlideAsRead(id))
    }
  }
}

const NextBtnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NextBtn)

export default NextBtnContainer;
