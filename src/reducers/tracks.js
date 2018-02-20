import axios from 'axios'

const tracks = (state = [], action) => {
  console.log("REDUCER", action)
  if (action.type == "UPDATE_TRACKS_SUCCESS"){
    return action.payload.data.model
  }  else if (action.type == "UPDATE_TRACKS_FAIL") {
    window.localStorage.removeItem("access_token");
    return { error: "Unauthorized" }
  } else if (action.type == "UPDATE_TRACKS") {
    return { loading: true }
  }
  return state || []
}

export default tracks
