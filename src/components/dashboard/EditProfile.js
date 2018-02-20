import React, { Component } from 'react'

import { connect } from 'react-redux';

import {
  hideProfileEdit,
  updateProfile,
  addPictureToProfileToEdit
} from '../../actions'

class EditProfile extends Component{
  constructor(props){
    super(props)
    this.state = {
      profilToEdit: props.profileToEdit
    }
  }

  componentWillReceiveProps(props){
    this.setState({
      profilToEdit: props.profileToEdit
    })
  }

  changeProfilePicture(){
    var file = this.picture.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({picture: reader.result})
      this.props.addPictureToProfileToEdit(reader.result)
    };
    reader.onerror =  (error) => {
      console.log('Error: ', error);
    };
  }

  updateProfile(){
    this.props.updateProfile({
      ...this.props.profile,
      firstName: this.state.profilToEdit.firstName,
      lastName: this.state.profilToEdit.lastName,
      phoneNumber: this.state.profilToEdit.phoneNumber,
      picture: this.state.picture || this.state.profilToEdit.picture,
      currentPassword: this.state.profilToEdit.currentPassword,
      newPassword: this.state.profilToEdit.newPassword
    })
    this.props.hideProfileEdit(this.state.profilToEdit)
  }

  render(){
    return <div className="editProfilHolder" onClick={ () => this.props.hideProfileEdit() }>
      <div className="editProfil" onClick={ (e) => e.stopPropagation() }>
        <form onSubmit={ (e) => { e.preventDefault(); this.updateProfile() } }>
          <div className="form-group">
            <input onChange={ (e) => this.setState({
                       profilToEdit: {...this.state.profilToEdit, firstName: e.target.value}
                   }) }
                   value={this.state.profilToEdit.firstName} className="form-control" />
          </div>
          <div className="form-group">
            <input onChange={ (e) => this.setState({
                       profilToEdit: {...this.state.profilToEdit, phoneNumber: e.target.value}
                   }) }
                   value={this.state.profilToEdit.phoneNumber} className="form-control" />
          </div>
          <div className="form-group">
            <input onChange={ (e) => this.setState({
                       profilToEdit: {...this.state.profilToEdit, lastName: e.target.value}
                   }) }
                   value={this.state.profilToEdit.lastName} className="form-control" />
          </div>
          <div className="form-group">
            <input onChange={ (e) => this.setState({
                       profilToEdit: {...this.state.profilToEdit, currentPassword: e.target.value}
                   }) }
                   value={this.state.profilToEdit.currentPassword}
                   type="password" placeholder="current password" className="form-control" />
          </div>
          <div className="form-group">
            <input onChange={ (e) => this.setState({
                       profilToEdit: {...this.state.profilToEdit, newPassword: e.target.value}
                   }) }
                   value={this.state.profilToEdit.newPassword}
                   type="password" placeholder="new password" className="form-control" />
          </div>
          <div className="form-group">
            <input type="file" onChange={() => this.changeProfilePicture()} ref={(input) => this.picture = input } className="form-control" />
          </div>
          <div className="form-group">
            <button className="btn btn-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  }
}


const mapStateToProps = state => {
  return {
    profileToEdit: state.profileToEdit
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideProfileEdit: (profile) => {
      dispatch(hideProfileEdit(profile))
    }, updateProfile: (profile) => {
      dispatch(updateProfile(profile))
    }, addPictureToProfileToEdit: (picture) => {
      dispatch(addPictureToProfileToEdit(picture))
    }
  }
}

const EditProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile)


export default EditProfileContainer
