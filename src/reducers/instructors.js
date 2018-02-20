const instructors = (state = [], action) => {
  if (action.type == "UPDATE_CURRENT_PROFILE_SUCCESS") {
    return action.payload.data.instructors
  }
  return state || []
}

export default instructors;
