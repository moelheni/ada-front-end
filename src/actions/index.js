export const updateCurrentProfile = () => {
  return {
    type: "UPDATE_CURRENT_PROFILE",
    payload: {
      request:{
        url:'/api/authorize/profile',
        headers: {'Authorization': "bearer " + window.localStorage.access_token}
      }
    }
  }
}

export const updateDashCards = () => {
  return {
    type: "UPDATE_CURRENT_DASH_CARD",
    payload: {
      request:{
        url:'/api/v1/DashCards',
        headers: {'Authorization': "bearer " + window.localStorage.access_token}
      }
    }
  }
}

export const updateTracksList = () => {
  return {
    type: "UPDATE_TRACKS",
    payload: {
      request:{
        url:'/api/v1/Tracks',
        headers: {'Authorization': "bearer " + window.localStorage.access_token}
      }
    }
  }
}

export const updateCurrentMenuTab = (tab) => {
  return {
    type: "UPDATE_CURRENT_MENU_TAB",
    payload: {
      tab
    }
  }
}

export const markSlideAsRead = (id) => {
  return {
    type: "MARK_SLIDE_READ",
    payload: {
      request: {
        method: 'POST',
        url:'/api/v1/ReadSlides/MarkAsRead',
        headers: {'Authorization': "bearer " + window.localStorage.access_token},
        data: { slideId: id }
      }
    }
  }
}


export const markCardAsExpanded = (id) => {
  return {
    type: "MARK_CARD_EXPANDED",
    payload: {
      request: {
        method: 'POST',
        url:'/api/v1/ExpandedDashCards/MarkAsExpanded',
        headers: {'Authorization': "bearer " + window.localStorage.access_token},
        data: { dashCardId: id }
      }
    }
  }
}

export const addProduct = (product) => {
  return {
    type: "ADD_PRODUCTS",
    payload: {
      request: {
        method: 'POST',
        url:'/api/v1/Products',
        headers: {
          'Authorization': "bearer " + window.localStorage.access_token,
          'content-type': "application/json"
        },
        data: product
      }
    }
  }
}

export const updateProduct = (id, product) => {
  return {
    type: "UPDATE_PRODUCT",
    payload: {
      request: {
        method: 'PUT',
        url:'/api/v1/Products/'+id,
        headers: {
          'Authorization': "bearer " + window.localStorage.access_token,
          'content-type': "application/json"
        },
        data: product
      }
    }
  }
}

export const updateProfile = (profile) => {
  return {
    type: "UPDATE_PROFILE",
    payload: {
      request: {
        method: 'POST',
        url:'/api/authorize/update',
        headers: {
          'Authorization': "bearer " + window.localStorage.access_token,
          'content-type': "application/json"
        },
        data: profile
      }
    }
  }
}

export const answerQuiz = (id) => {
  return {
    type: "ANSWER_QUIZ",
    payload: {
      request: {
        method: 'POST',
        url:'/api/v1/Answers/CheckChoice',
        headers: {
          'Authorization': "bearer " + window.localStorage.access_token,
          'content-type': "application/json"
        },
        data: {
          choiceId: id
        }
      }
    }
  }
}

export const applyVoucherCode = (voucherCode) => {
  return {
    type: "APPLY_VOUCHER_CODE",
    payload: {
      request: {
        method: 'POST',
        url:'/api/authorize/apply',
        headers: {
          'Authorization': "bearer " + window.localStorage.access_token,
          'content-type': "application/json"
        },
        data: {
          voucherCode
        }
      }
    }
  }
}

export const deleteProduct = (id) => {
  return {
    type: "DELETE_PRODUCT",
    payload: {
      request: {
        method: 'DELETE',
        url:'/api/v1/Products/'+id,
        headers: {
          'Authorization': "bearer " + window.localStorage.access_token,
          'content-type': "application/json"
        }
      }
    }
  }
}
export const updateCurrentLesson = (lesson_id) => {
  return {
    type: "UPDATE_CURRENT_LESSON",
    payload: {
      request:{
        url:'/api/v1/Lessons/'+lesson_id,
        headers: {'Authorization': "bearer " + window.localStorage.access_token}
      }
    }
  }
}


export const updateCurrentSlide = (slide_id) => {
  return {
    type: "UPDATE_CURRENT_SLIDE",
    payload: {
      request:{
        url:'/api/v1/Slides/'+slide_id,
        headers: {'Authorization': "bearer " + window.localStorage.access_token}
      }
    }
  }
}

export const updateModulesList = (track_id) => {
  return {
    type: "UPDATE_MODULES_LIST",
    payload: {
      request:{
        url:'/api/v1/SubTracks/'+track_id,
        headers: {'Authorization': "bearer " + window.localStorage.access_token}
      }
    }
  }
}

export const showProfileEdit = (profile) => {
  return {
    type: "SHOW_PROFILE_EDIT",
    payload: profile
  }
}

export const addPictureToProfileToEdit = (picture) => {
  return {
    type: "ADD_PICTURE_TO_PROFILE_EDIT",
    payload: picture
  }
}

export const hideProfileEdit = (profile) => {
  return {
    type: "HIDE_PROFILE_EDIT",
    payload: profile
  }
}
