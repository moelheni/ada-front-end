import React, { Component } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

import LessonsListItem from './LessonsListItem'


class LessonsList extends Component{
  sortedLessons(){
    return this.props.lessons.sort( (a,b) => {
        return (a.orderIndicator > b.orderIndicator )? 1 : (a.orderIndicator < b.orderIndicator )? -1 : 0
    })
  }
  render(){
    return <div>
    {
      this.sortedLessons().map( (lesson) => {
        return (
          <div className="LessonsList">
            <LessonsListItem lesson={lesson} color={this.props.color} showContinue={this.props.showContinue} />
          </div>
        )
      })
    }
    </div>
  }
}

export default LessonsList;
