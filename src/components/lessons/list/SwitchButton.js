import React, { Component } from 'react';

class SwitchButton extends Component{
  constructor(props){
    super(props)
    this.state = {
      buttonState: props.initState
    }

    this.clickHandler = this.clickHandler.bind(this)
  }

  getCardsViewStyle(){
    return (this.state.buttonState)? active : {}
  }

  getListViewStyle(){
    return (!this.state.buttonState)? active : {}
  }

  clickHandler(){
    this.props.onClick()
    this.setState({
      buttonState: !this.state.buttonState
    })
  }

  render(){
    return (
      <div className="SwitchButton" onClick={this.clickHandler}>
        <div className="CardsView" style={this.getCardsViewStyle()}>
        </div>
        <div className="ListView" style={this.getListViewStyle()}>
        </div>
      </div>
    )
  }
}

const active = {
  backgroundColor: "#F0676E"
}


export default SwitchButton
