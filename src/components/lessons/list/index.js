import React, { Component } from 'react';
import VerticalView from './VerticalView'
import HorizontalView from './HorizontalView'
import SwitchButton from './SwitchButton'
import ErrorComponent from '../../error'
import { Redirect } from 'react-router-dom'
import { updateModulesList } from '../../../actions'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading';

import './style.css';


class ModulesListComp extends Component {
  constructor(props){
    super(props)
    if(window.localStorage.listModulesViewPref){
      this.state = {
        ...JSON.parse(window.localStorage.listModulesViewPref)
      }
    }else {
      this.state = {
        verticalView: true
      }
    }
    
    this.props.updateModulesList(this.props.match.params.id)

    this.toggleView = this.toggleView.bind(this)
    
  }

  componentWillReceiveProps(props){
    console.log(props)
  }

  toggleView(){
    this.setState({
      verticalView: !this.state.verticalView
    })
  }

  setState(obj){
    super.setState(obj)
    let state = { ...this.state, ...obj }
    window.localStorage.listModulesViewPref = JSON.stringify(state)
  }

  render() {
    return (
      <div>
        {
          typeof this.props.modules.error != "undefined" &&
          <div className="container">
            <ErrorComponent />
          </div>
        }
        {
          typeof this.props.modules.error == "undefined" &&
          <div className="container">
            <div className="switchHoler">
              Switch Views <SwitchButton initState={this.state.verticalView} onClick={ this.toggleView } >Toggle</SwitchButton>
            </div>
            <div className="lessonsList">
              { !this.state.verticalView &&
                  <VerticalView modules={ this.props.modules } />
              }

              { this.state.verticalView &&
                  <HorizontalView modules={ this.props.modules } />
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modules: state.modules
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateModulesList: id => {
      dispatch(updateModulesList(id))
    }
  }
}

const ModulesList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModulesListComp)

export default ModulesList;
