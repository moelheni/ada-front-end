const slides = (state = [], action) => {
  if (action.type == "UPDATE_CURRENT_SLIDE_SUCCESS") {
    const slide =  action.payload.data.model
    console.log("Current Slide ", slide)
    let slides = slide.lesson.slides
    slides.push({
      id:slide.id,
      name: slide.name,
      orderIndicator: slide.orderIndicator,
      isRead: slide.isRead
    })
    slides.sort(function(a, b){
      return ((a.orderIndicator < b.orderIndicator)? -1 : (a.orderIndicator < b.orderIndicator)? 0: 1)
    })
    return slides
  } else if (action.type == "UPDATE_CURRENT_LESSON_SUCCESS") {
    return action.payload.data.model.slides.sort(function(a, b){
      return ((a.orderIndicator < b.orderIndicator)? -1 : (a.orderIndicator < b.orderIndicator)? 0: 1)
    })
  } else if (action.type == "MARK_SLIDE_READ_SUCCESS"){
    for (var i = 0; i < state.length; i++) {
      if(state[i].id == action.payload.data.model.id){
        state[i].isRead = true;
        break;
      }
    }
    return state
  } else if (action.type == "UPDATE_CURRENT_SLIDE" || action.type == "UPDATE_CURRENT_LESSON"){
    if (state.length == 0) {
      return {
        loading: true
      }
    }
  }
  return state || []
}

export default slides;
