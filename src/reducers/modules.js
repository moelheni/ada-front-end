const modules = (state = [], action) => {
  if(action.type == "UPDATE_MODULES_LIST_SUCCESS"){
    return action.payload.data.model.modules
  } else if (action.type == "UPDATE_MODULES_LIST_FAIL") {
    return { error: "Anuthorized" }
  } else if (action.type == "UPDATE_MODULES_LIST") {
    return { loading: true }
  }
  return state || []
}

export default modules
