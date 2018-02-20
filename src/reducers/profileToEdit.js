const profileToEdit = (state, action) => {
  if (action.type == "SHOW_PROFILE_EDIT") {
    return { ...action.payload, hided: false }
  } else if (action.type == "ADD_PICTURE_TO_PROFILE_EDIT"){
    return { ...state, picture: action.payload }
  } else if (action.type == "HIDE_PROFILE_EDIT") {
    if (action.payload){
      return {...action.payload, hided: true }
    } else return { ...state, hided: true }
  }
  return state || { hided: true }
}

export default profileToEdit;
