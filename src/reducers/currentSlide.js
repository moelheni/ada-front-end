const currentSlide = (state = {}, action) => {
  if (action.type == "UPDATE_CURRENT_SLIDE_SUCCESS") {
    window.localStorage.last_lesson = action.payload.data.model.lesson.id
    window.localStorage.last_lesson_title = action.payload.data.model.lesson.name
    return action.payload.data.model
  } else if (action.type == "UPDATE_CURRENT_SLIDE_FAIL") {
    return { error: "Anuthorized" }
  } else if (action.type == "UPDATE_CURRENT_SLIDE") {
    return {loading: true}
  } else   if (action.type == "UPDATE_CURRENT_LESSON_SUCCESS") { // when lesson selected remove current Slide
    return {}
  }
  return state || {}
}

export default currentSlide;
