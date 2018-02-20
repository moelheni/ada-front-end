import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class SubTrack extends Component{
  render(){
    let level = this.props.level
    let index = this.props.index
    return(
      <li key={level.id} className={(level.locked)?"locked":""}>
        <Link to={`/subTracks/${level.id}/modules`}>
          <div className="subTrack-level">
            #<span>{index}</span>
          </div>
          <div className="subTrack-name">
            <div>
              { level.name }
              <div className="percent">
                { level.progress || 0 }%
              </div>
            </div>
          </div>
          <i className="fa fa-angle-double-right"></i>
        </Link>
      </li>
    )
  }
}

export default SubTrack
