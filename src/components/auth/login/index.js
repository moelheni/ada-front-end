import React, {Component} from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

import './style.css'

const URL = "https://ada.gomycode.tn"

class Login extends Component{
  constructor(props) {
    super(props)
    this.state= {
      logedin: false,
      errorExist: false,
      error: "",
      loading: false
    }
  }

  auth(){
    this.setState({
      loading: true
    })
    axios.post(URL+"/api/authorize", {
      email: this.email.value,
      password: this.password.value
    }).then( (data) => {
      window.localStorage.access_token = data.data.token
      this.setState({
        logedin: true,
        loading: false
      })
    }).catch( (err) => {
      console.log(err)
      this.setState({
        errorExist: true,
        error: "Either the password or the email are invalide",
        loading: false
      })
    })
  }

  render(){
    return(
      <div className="Login floating-box">
        {
          this.state.logedin &&
          <Redirect to={this.props.backto || "/"} />
        }
        <div className="Login-header">
          Login
        </div>
        {
          this.state.errorExist &&
          <div className="Errors">
            <div className="alert alert-danger">
              { this.state.error }
            </div>
          </div>
        }
        {
          this.props.message && !this.state.errorExist &&
          <div className="Errors">
            <div className="alert alert-warning">
              { this.props.message }
            </div>
          </div>
        }
        <form onSubmit={ (e) => { e.preventDefault(); this.auth() } }>
          <div>
            <input className="form-control" name="email"  ref={(input) => { this.email = input; }} placeholder="email" />
          </div>
          <div>
            <input className="form-control" name="password" ref={(input) => { this.password = input; }} placeholder="password" type="password" />
          </div>
          <div>
            <button className="btn btn-success">
              { this.state.loading && <i className="fa fa-spinner" aria-hidden="true"></i> }
              Login
            </button>
          </div>
        </form>
        <div>
          <button className="btn btn-warning" onClick={ () => { window.location.href = "/api/authorize/providers/GitHub"} }>
            <i className="fa fa-github" aria-hidden="true"></i> Login With Github
          </button>
        </div>
        <div className="forget-password">
          <Link to="/forget">
            Forgot your password?
          </Link>
        </div>
        <div className="register-link">
          <Link to="/register">
            <button className="btn btn-primary">Register</button>
          </Link>
        </div>
      </div>
    )
  }
}


export default Login;
