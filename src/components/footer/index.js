import React, {Component} from 'react'

import './style.css'

class Footer extends Component{
  render(){
    return(
      <footer className="main-footer">
        <hr />
        <span>Made {"with"} <i className="fa fa-heart"></i>,<i class="devicon-react-original colored"></i> & <i class="fa fa-coffee" aria-hidden="true"></i> {"in"} Tunis</span>
        -
        <span>
          <a href="" target="_blank">Contact us</a>
        </span>
        -
        <span><a href="https://www.gomycode.tn" target="_blank">GoMyCode.tn</a></span>
      </footer>
    )
  }
}

export default Footer