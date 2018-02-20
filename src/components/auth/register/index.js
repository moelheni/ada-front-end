import React, {Component} from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'


const URL = "https://ada.gomycode.tn"

class Register extends Component{
  constructor(props) {
    super(props)
    this.state= {
      logedin: false,
      error: false,
      loading: false
    }
  }

  register(){
    this.setState({
      loading: true
    })
    axios.post(URL+"/api/authorize/signup", {
      email: this.email.value,
      password: this.password.value,
      firstName: this.firstname.value,
      lastName: this.lastname.value,
      phoneNumber: this.phonenumber.value,
      voucherCode: this.voucherCode.value,
    }).then( (data) => {
      console.log(data)
      window.localStorage.access_token = data.data.token
      this.setState({
        logedin: true,
        loading: false
      })
      console.log(this)
    }).catch( (err) => {
      console.log(err.response.data)
      let error = []
      for(let e in err.response.data){
        error.push ( err.response.data[e] )
      }
      this.setState({
        error,
        loading: false
      })
      console.log(err)
    })
  }

  render(){
    return(
      <div className="Login floating-box">
        {
          this.state.logedin &&
          <Redirect to='/' />
        }
        {
          this.state.error &&
          this.state.error.map((e) => <div className="alert alert-warning">{e}</div>)
        }
        <div className="Login-header">
          Register
        </div>
        <form onSubmit={ (e) => { e.preventDefault();this.register() } }>
          <div>
            <input className="form-control" name="email"  ref={(input) => { this.email = input; }} placeholder="email" />
          </div>
          <div>
            <input className="form-control" name="password" ref={(input) => { this.password = input; }} placeholder="password" type="password" />
          </div>
          <div>
            <input className="form-control" name="firstname" ref={(input) => { this.firstname = input; }} placeholder="firstname" type="text" />
          </div>
          <div>
            <input className="form-control" name="lastname" ref={(input) => { this.lastname = input; }} placeholder="lastname" type="text" />
          </div>
          <div>
            <input className="form-control" name="phonenumber" ref={(input) => { this.phonenumber = input; }} placeholder="phonenumber" type="text" />
          </div>
          <div>
            <input className="form-control" name="voucherCode" ref={(input) => { this.voucherCode = input; }} placeholder="voucherCode" type="text" />
          </div>

          <div>
            <button className="btn btn-success">
              { this.state.loading && <i className="fa fa-spinner" aria-hidden="true"></i> }
              Sign up
            </button>
          </div>
        </form>



        <div className="register-link">
          <Link to="/login">
            <button className="btn btn-link">Already regitred?</button>
          </Link>
        </div>
      </div>
    )
  }
}


export default Register;
