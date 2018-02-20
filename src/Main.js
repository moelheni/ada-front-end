import React, { Component } from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import TracksList from './components/tracks'
import ModulesList from './components/lessons/list'
import LessonItem from './components/lessons/item'
import Slide from './components/lessons/slides/item'
import Login from './components/auth/login'
import Register from './components/auth/register'
import ForgetPassword from './components/auth/forget'
import ResetPassword from './components/auth/forget/Reset'

import Logout from './components/auth/logout'
import Dashboard from './components/dashboard'
import Footer from './components/footer'
import Quiz from './components/quiz'
import { connect } from 'react-redux'
import {updateCurrentMenuTab} from './actions'


import './style.css'

class Main extends Component{
  constructor(props){
    super(props)
    this.state = {
      showMenu: false,
      fullSizeMenu: false
    }
  }

  toggleMenu(){
    if(window.screen.width < 768)
      this.setState({
        showMenu: !this.state.showMenu
      })
  }

  menuStyle(){
    if (this.state.showMenu) {
      return {
        right: 0,
        display: "block"
      }
    } else {
      return {
        right: "-200px"
      }
    }
  }

  currentTab(){
      const wl = window.location
      if ((wl.href.replace(wl.origin, "").indexOf("subTracks") != -1) ||
          (wl.href.replace(wl.origin, "").indexOf("lessons") != -1)   ||
          (wl.href.replace(wl.origin, "").indexOf("slides") != -1)){
            return "/courses"
      }else return wl.href.replace(wl.origin, "")
  }

  render(){
    return(
      <div>
        <header>
          <div className="main-nav">
            <div className={"menu-container container "+((this.state.fullSizeMenu)?"fullScreen":"")} style={
              (!window.localStorage.access_token)?
              {
                justifyContent: "center"
              }:
              {
                justifyContent: "space-between"
              }
            } >
              <div className="gomycode-title">
                <div className="whole-title">
                  <Link to="/">
                    <strong>GOMYCODE</strong> ONLINE ACADEMY
                  </Link>
                </div>
                <div className="responsive-title">
                  <Link to="/">
                    <strong>GMC</strong> ONLINE ACADEMY
                  </Link>
                </div>

                {
                  (window.localStorage.access_token) &&
                  <div className="expand-menu-responsive" onClick={this.toggleMenu.bind(this)}>
                    <i className="fa fa-align-justify"></i>
                  </div>
                }
              </div>
              <div className="main-menu" style={this.menuStyle.call(this)}>
                <i onClick={this.toggleMenu.bind(this)} className="fa fa-times"></i>
                {
                  (window.localStorage.access_token) &&
                  <ul>
                    <li className={(this.currentTab()=="/dashboard" || this.currentTab()=="/")?"active":""}>
                      <Link to="/dashboard" onClick={this.toggleMenu.bind(this)}>
                        Dashboard
                      </Link>
                    </li>
                    <li className={(this.currentTab()=="/tracks")?"active":""}>
                      <Link to="/tracks" onClick={this.toggleMenu.bind(this)}>
                        Tracks
                      </Link>
                    </li>
                    <li className={(this.currentTab()=="/courses")?"active":""}>
                      <Link to={(window.localStorage.last_lesson)?"/lessons/"+(window.localStorage.last_lesson):"/tracks"} onClick={this.toggleMenu.bind(this)}>
                        Courses
                      </Link>
                    </li>

                      <li>
                        <Link to="/logout" onClick={this.toggleMenu.bind(this)}>
                          Logout
                          <i className="fa fa-sign-out" aria-hidden="true"></i>
                        </Link>
                      </li>

                  </ul>
                }
              </div>
            </div>
          </div>
        </header>
        <section className="content-switch" style={
          {
            minHeight: window.innerHeight - 60
          }
        }>
          <Switch>
            <Route exact path='/' render={
              () => {
                if(this.state.fullSizeMenu)
                  this.setState({
                    fullSizeMenu: false
                  })
                return (window.localStorage.access_token)?
                <Dashboard />:
                <Login message="Should login first" backto="/" />
              }
            }/>
            <Route exact path='/dashboard' render={
              () => {
                if(this.state.fullSizeMenu)
                  this.setState({
                    fullSizeMenu: false
                  })
                return (window.localStorage.access_token)?
                <Dashboard />:
                <Login message="Should login first" backto="/" />
              }
            }/>
            <Route exact path='/tracks' render={
              () => {
                if(this.state.fullSizeMenu)
                  this.setState({
                    fullSizeMenu: false
                  })
                return (window.localStorage.access_token)?
                <TracksList />:
                <Login message="Should login first" backto="/tracks" />
              }
            }/>
            <Route exact path='/subTracks/:id/modules' render={
              (props) => {
                if(this.state.fullSizeMenu)
                  this.setState({
                    fullSizeMenu: false
                  })
                return (window.localStorage.access_token)?
                  <ModulesList match={props.match} />:
                  <Login message="Should login first"
                         backto={"/subTracks/"+props.match.params.id+"/modules"} />
              }
            }/>
            <Route exact path='/lessons/:id' render={
              (props) => {
                if(this.state.fullSizeMenu == false)
                  this.setState({
                    fullSizeMenu: true
                  })
                return (window.localStorage.access_token)?
                  <LessonItem match={props.match} />:
                  <Login message="Should login first"
                         backto={"/lessons/"+props.match.params.id} />
              }
            }/>
            <Route exact path='/lessons/:id/quiz/:quiz_id' render={
              (props) => {
                if(this.state.fullSizeMenu == false)
                  this.setState({
                    fullSizeMenu: true
                  })
                return (window.localStorage.access_token)?
                  <Quiz match={props.match} />:
                  <Login message="Should login first"
                         backto={"/lessons/"+props.match.params.id+"/quiz/"+props.match.params.quiz_id} />
              }
            }/>
            <Route exact path='/slides/:id' render={
              (props) => {
                if(this.state.fullSizeMenu == false)
                  this.setState({
                    fullSizeMenu: true
                  })
                return (window.localStorage.access_token)?
                    <Slide match={props.match} />:
                    <Login message="Should login first"
                           backto={"/slides/"+props.match.params.id} />
              }
            }/>
            <Route exact path='/login' render={
              ()=> {
                if(this.state.fullSizeMenu)
                  this.setState({
                    fullSizeMenu: false
                  })
                return (window.localStorage.access_token)?
                <Dashboard message="Aleady connected"/>:
                <Login/>
              }
            }/>
            <Route exact path='/forget' component={ForgetPassword}/>
            <Route exact path='/reset' component={ResetPassword}/>
            <Route exact path='/logout' component={Logout}/>
            <Route exact path='/register' render={
              () => {
                if(this.state.fullSizeMenu)
                  this.setState({
                    fullSizeMenu: false
                  })
                return (window.localStorage.access_token)?
                <Dashboard message="Aleady connected"/>:
                <Register/>
              }
            }/>
          </Switch>
        </section>
        <Footer />
      </div>
    )
  }
}



export default Main;
