import React, {Component} from 'react'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'

import EditProfile from './EditProfile'
import ProfileCard from './ProfileCard'
import DashCards from './DashCards'
import Instructors from './Instructors'
import VoucherCodeUpdater from './VoucherCodeUpdater'
import ProductManager from './ProductManager'

import {
  updateCurrentProfile,
  updateProfile
} from '../../actions'

import './style.css'

class Dashboard extends Component{
  constructor(props){
    super(props);
    props.updateCurrentProfile()
  }

  getLastLessonId(){
    if (window.localStorage.last_lesson) {
      return window.localStorage.last_lesson
    }
    return null
  }

  render(){
    return(
      <div>
        {
          this.props.profile && this.props.profile.error &&
          <Redirect to="/login" />
        }
        {
          this.props.profile && this.props.profile.firstName && !this.props.profile.loading &&
          <div className="Dashboard container">
            {
              !this.props.profileToEdit.hided &&
              <EditProfile />
            }

            <div className="row">
              <div className="col-md-3">
                <ProfileCard />
              </div>
              <div className="col-md-5">
                <ProductManager />

                <DashCards />

              </div>
              <div className="col-md-4">
                {
                  this.getLastLessonId() &&
                  <div className="floating-box nextCourse">
                    <h3>
                    {
                      window.localStorage.last_lesson_title
                    }
                    </h3>
                    <Link to={"/lessons/"+(this.getLastLessonId())} >
                      <button className="btn btn-success continueBtn">
                        <i className="fa fa-play"></i>
                      </button>
                    </Link>
                  </div>
                }
                <Instructors />
                <VoucherCodeUpdater />
              </div>
            </div>
          </div>
        }

        {
          this.props.profile && this.props.profile.loading &&
          <div className="container loading codesandbox-loading">
            {
              // a loader should be implemented
            }
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    dashCards: state.dashCards,
    profile: state.profil,
    instructors: state.instructors,
    profileToEdit: state.profileToEdit
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentProfile: () => {
      dispatch(updateCurrentProfile())
    }
  }
}

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)


export default DashboardContainer
