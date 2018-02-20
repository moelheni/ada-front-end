import React, { Component } from 'react';
import './style.css';
import { connect } from 'react-redux'

import {updateTracksList} from '../../actions'

import { Link, Redirect } from 'react-router-dom'

import SubTrack from './SubTrack'
import Loader from './Loader'

class TracksListComp extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
      {
        this.props.tracks.error &&
        <Redirect to="/login" />
      }
      {
        this.props.tracks.loading &&
        <Loader />
      }
      {
        !this.props.tracks.loading && !this.props.tracks.error &&
        <div className="TracksList container">
          {
            this.props.tracks.map((track, index) => {
                return(
                  <div key={track.id} className="tracks-box floating-box">
                    <div className="track-name" style={
                      {
                        backgroundImage: "url(https://ada.gomycode.tn/assets/images/tracks/"+track.id+".jpg)"
                      }
                    }>
                      <div className="layer-black"></div>
                      <div>{track.name}</div>
                    </div>
                    <ul className="sub-tracks">
                      {
                        track.subTracks && track.subTracks.map( (level, index) => {
                          return (
                            <SubTrack level={level} index={index+1} />
                          )
                        })
                      }
                    </ul>
                  </div>
                )
              }
            )
          }
        </div>
      }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    tracks: state.tracks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateTracksList: () => {
      dispatch(updateTracksList())
    }
  }
}

const TracksList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TracksListComp)

const colors = ["7EB9EC", "F0676E", "BBE492", "E57AF4", "55D6B9"]

export default TracksList;
