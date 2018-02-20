import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import './style.css'

class ErrorComponent extends Component{
  render(){
    return(
      <div className="ooops">
        <div className="sad-face">:(</div>
        <div className="ooopsContent">
          <h1>Ooops</h1>
          <h2>
            There{"'"}s nothing here!
          </h2>
          <p>
            You are trying to access something that doesn{"'"}t exist
            <br />
            or you don{"'"}t have permission to.
          </p>
          <Link to="/">
            <button className="btn btn-success">
              <i className="fa fa-angle-left"></i> Back to Home Page</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default ErrorComponent
