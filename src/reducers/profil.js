const profil = (state = {}, action) => {
  if (action.type == "UPDATE_CURRENT_PROFILE_SUCCESS") {
    console.log("PROFIL: ", action.payload.data.user)
    return (action.payload.data.user && action.payload.data.user.firstName)?action.payload.data.user:state
  } else if (action.type == "UPDATE_CURRENT_PROFILE") {
    return {
      loading: true
    }
  } else if (action.type == "UPDATE_CURRENT_PROFILE_FAIL") {
    window.localStorage.removeItem("access_token");
    return {
      error: true
    }
  } else if (action.type == "APPLY_VOUCHER_CODE_SUCCESS") {
    window.localStorage.access_token = action.payload.data.token
    return {
      ...state,
      appliedVoucherCode: true
    }
  } else if (action.type == "APPLY_VOUCHER_CODE_FAIL") {
    let appliedVoucherCodeError = action.error.response.data.voucherCode
    return {
      ...state,
      appliedVoucherCode: false,
      appliedVoucherCodeError
    }
  }
  return state || {}
}

export default profil;
