import React, { Component } from 'react'
import { connect } from 'react-redux';

import {
  updateDashCards,
  markCardAsExpanded
} from '../../actions'

class DashCards extends Component{
  constructor(props){
    super(props)
    this.state = {
      qStyle: {zIndex: 1},
      aStyle: { transform: "rotateX(180deg)", zIndex: 0 },
      showAnswer: false,
      cardIndex: 0,
      transitionCard: false,
    }
    props.updateDashCards()
  }

  toggleAnswer(){
    this.setState({
      qStyle: { ...this.state.aStyle},
      aStyle: { ...this.state.qStyle},
      showAnswer: true
    })
  }

  showNextCard(){
    this.props.markCardAsExpanded(this.props.dashCards[this.state.cardIndex].id)
    let s = this.state
    this.setState({
      transitionCard: true,
      cardIndex: (s.cardIndex == this.props.dashCards.length - 1)? 0 : s.cardIndex  +1
    })
    this.toggleAnswer()
    window.setTimeout(() => {
      this.setState({
        transitionCard: false
      })
    }, 100)
  }

  render(){
    return <div>
    {
      !this.props.dashCards.loading && this.props.dashCards.length > 0 && !this.state.transitionCard &&
      <div className="floating-box no-padding floating-box-qa">
        <div className="question" style={ {...this.state.qStyle, backgroundColor: this.props.dashCards[this.state.cardIndex].color} } onClick={ () => this.toggleAnswer() }>
          {
            this.props.dashCards[this.state.cardIndex].question
          }
        </div>
        <div className="question answer" style={ { ...this.state.aStyle, backgroundColor: this.props.dashCards[this.state.cardIndex].color} } onClick={ () => this.showNextCard() }>
          {
            this.props.dashCards[this.state.cardIndex].answer
          }
        </div>
      </div>
    }
    </div>
  }
}


const mapStateToProps = state => {
  return {
    dashCards: state.dashCards
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateDashCards: () => {
      dispatch(updateDashCards())
    }, markCardAsExpanded: id => {
      dispatch(markCardAsExpanded(id))
    }
  }
}

const DashCardsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashCards)


export default DashCardsContainer
