import React, { Component } from 'react'
import { connect } from 'react-redux';

class Instructors extends Component{
  render(){
    return <div className="floating-box no-padding instructors-box">
      <header>
        <h3>My Instructors</h3>
      </header>
      <div className="instructor-pictures">
        {
          this.props.instructors && this.props.instructors.length == 0 &&
          <p>No instructors found</p>
        }
        {
          this.props.instructors.map((e) => {
            return <div className="instructor-card">
              <div style={{backgroundImage: `url(/assets/profiles/${e.picture})`}} className="instructor-picture"></div>
              <div>
                {
                  e.firstName
                }
              </div>
              <div>
                {
                  e.lastName
                }
              </div>
            </div>
          })
        }
      </div>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    instructors: state.instructors
  }
}

const InstructorsContainer = connect(
  mapStateToProps
)(Instructors)


export default InstructorsContainer
