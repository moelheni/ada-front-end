import React, {Component} from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import queryString from 'query-string'

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
    let userId = queryString.parse(window.location.search)["userId"]
    let code   = queryString.parse(window.location.search)["code"]
    console.log(userId, code)
    axios.post(URL+"/api/authorize/reset-password", {
      password: this.password.value,
      confirmPassword: this.confirmPassword.value,
      userId: userId,
      code: code
    }).then( (data) => {
      this.setState({
        submited: true,
        loading: false,
        errorExist: false,
      })
    }).catch( (err) => {
      console.log(err.response)
      let errorMessage = ""
      for (let i in err.response.data){
        errorMessage += err.response.data[i]+ " "
      }
      this.setState({
        errorExist: true,
        error: errorMessage,
        loading: false
      })
    })
  }

  render(){
    return(
      <div className="Login floating-box">
        {
          this.state.submited &&
          <Redirect to="/login" />
        }
        <div className="Login-header">
          Reset Password
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
          <input className="form-control" type="password" name="password"  ref={(input) => { this.password = input; }} placeholder="Password" />
        </div>
        <div>
          <input className="form-control" type="password" name="confirmPassword"  ref={(input) => { this.confirmPassword = input; }} placeholder="Confirm Password" />
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
