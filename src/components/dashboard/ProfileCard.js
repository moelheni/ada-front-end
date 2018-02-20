import React, { Component } from 'react'
import { connect } from 'react-redux';

import {
  showProfileEdit
} from '../../actions'

class ProfileCard extends Component{

  showEditProfile(){
    this.props.showProfileEdit(this.props.profile)
  }

  render(){
    return <div className="floating-box no-padding bottom-padding profile-card">
      <div className="editProfileBtn" onClick={() => this.showEditProfile()}>
        <i className="fa fa-pencil"></i>
      </div>
      <div
        style={
          {
            backgroundImage: (this.props.profileToEdit.picture)? `url(${this.props.profileToEdit.picture})` : `url(/assets/profiles/${this.props.profile.picture})`
          }
        } className="user-picture"></div>
      <div className="box-content">
        <h3>
          {this.props.profileToEdit.firstName || this.props.profile.firstName}
          {" "}
          {this.props.profileToEdit.lastName || this.props.profile.lastName}
        </h3>
        {/*
        <div className="next-badge">
          <h4>Next badge: <strong>HTML Master</strong></h4>
          <div className="progress">
            <div style={{width:"40%", backgroundColor: "red"}}></div>
          </div>
        </div>
        */}
      </div>
      {
        this.props.profile.acquiredBadges &&
        <div className="badges">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      }
      {
        !this.props.profile.acquiredBadges &&
        <div className="badges">
          Work hard to get your first badge
        </div>
      }
    </div>
  }
}


const mapStateToProps = state => {
  return {
    profile: state.profil,
    profileToEdit: state.profileToEdit
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showProfileEdit: (profile) => {
      dispatch(showProfileEdit(profile))
    }
  }
}


const ProfileCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileCard)


export default ProfileCardContainer
