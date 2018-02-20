const currentLesson = (state = [], action) => {
  if (action.type == "UPDATE_CURRENT_LESSON_SUCCESS") {
    return action.payload.data.model
  } else if (action.type == "UPDATE_CURRENT_LESSON_FAIL") {
    return { error: "Anuthorized" }
  } else if (action.type == "UPDATE_CURRENT_LESSON") {
    return { loading: true }
  }
  return state || {}
}

export default currentLesson;
