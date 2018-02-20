import React, {Component} from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'


const URL = "https://ada.gomycode.tn"

class ForgetPassword extends Component{
  constructor(props) {
    super(props)
    this.state= {
      submited: false,
      errorExist: false,
      error: "",
      loading: false
    }
  }

  auth(){
    this.setState({
      loading: true
    })
    axios.post(URL+"/api/authorize/forgot-password", {
      email: this.email.value
    }).then( (data) => {
      this.setState({
        submited: true,
        loading: false,
        errorExist: false,
      })
    }).catch( (err) => {
      this.setState({
        errorExist: true,
        error: "User doesn't exist or it has an unconfirmed account",
        loading: false
      })
    })
  }

  render(){
    return(
      <div className="Login floating-box">
        {
          this.state.submited &&
          <div className="alert alert-info">
            Check your email box
          </div>
        }
        <div className="Login-header">
          Forget Password
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
          this.props.message &&
          <div className="Errors">
            <div className="alert alert-warning">
              { this.props.message }
            </div>
          </div>
        }
        <div>
          <input className="form-control" name="email"  ref={(input) => { this.email = input; }} placeholder="email" />
        </div>

        <div>
          <button className="btn btn-success" onClick={ this.auth.bind(this) }>
            { this.state.loading && <i className="fa fa-spinner" aria-hidden="true"></i> }
            Submit
          </button>
        </div>
      </div>
    )
  }
}


export default ForgetPassword;
