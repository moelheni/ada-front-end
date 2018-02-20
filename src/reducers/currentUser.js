const dummyUser = {
  name: "HTML",
  id: "",
  content: "HTML goes here"
}
const currentUser = (state = [], action) => {
  console.log(action)
  if (action.type == "UPDATE_CURRENT_USER") {
    return state
  }
  return dummyUser
}

export default currentUser;
