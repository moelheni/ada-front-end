const dashCards = (state = [], action) => {
  if (action.type == "UPDATE_CURRENT_DASH_CARD_SUCCESS") {
    return (action.payload.data)? action.payload.data.model : []
  } else if (action.type == "UPDATE_CURRENT_DASH_CARD") {
    return {
      loading: true
    }
  }
  return state || []
}

export default dashCards;
