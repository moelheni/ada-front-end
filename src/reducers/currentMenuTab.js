const currentMenuTab = (state = [], action) => {
  if (action.type == "UPDATE_CURRENT_MENU_TAB") {
    return action.payload.tab
  }
  return state || "/"
}

export default currentMenuTab;
