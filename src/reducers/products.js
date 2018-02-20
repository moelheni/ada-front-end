const products = (state = [], action) => {
  if (action.type == "ADD_PRODUCTS_SUCCESS") {
    return state.concat(action.payload.data.model)
  } else if (action.type == "UPDATE_CURRENT_PROFILE_SUCCESS") {
    return (action.payload.data.user) ? action.payload.data.products : state
  } else if (action.type == "UPDATE_PRODUCT_SUCCESS") {
    let updateProduct = action.payload.data.model
    return state.map( (item, index) => {
        if(item.id !== updateProduct.id) {
            return item;
        }

        return {
            ...item,
            ...updateProduct
        }
    })
  } else if (action.type == "DELETE_PRODUCT_SUCCESS") {
    return state.filter((e) => e.id != action.payload.data.model.id)
  }
  return state || []
}

export default products;
