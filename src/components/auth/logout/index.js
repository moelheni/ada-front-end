import React, {Component} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class Logout extends Component{
  constructor(props){
    super(props)
    window.localStorage.removeItem("access_token");
  }
  render(){
    return <Redirect to="/login" />
  }
}

export default Logout
