import { combineReducers, createStore } from "redux"

import tracks from './tracks'
import modules from './modules'
import currentLesson from './currentLesson'
import currentSlide from './currentSlide'
import currentUser from './currentUser'
import currentMenuTab from './currentMenuTab'
import slides from './slides'
import dashCards from './dashCards'
import profil from './profil'
import products from './products'
import instructors from './instructors'
import quizzes from './quizzes'
import profileToEdit from './profileToEdit'

const reducers = combineReducers({
  tracks,
  modules,
  currentLesson,
  currentSlide,
  currentUser,
  currentMenuTab,
  slides,
  dashCards,
  profil,
  products,
  instructors,
  quizzes,
  profileToEdit
})


export default reducers
