import {
  DELETE_BASIC,
  CREATE_BASIC,
  UPDATE_BASIC,
  SET_BASICS
} from '../actions/BasicDetails';
import Basic from  '../../models/Basic';

const initialState = {
  basicDetails : {
      id: "",
      name: "",
      email: "",
      phone: "",
      career_objective: ""
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BASICS:
      return {
        ...state,
        basicDetails: action.basics
      };
    case CREATE_BASIC:
      const newBasic = new Basic(
        action.basicData.id,
        action.basicData.name,
        action.basicData.email,
        action.basicData.phone,
        action.basicData.career_objective
      );
      return {
        ...state,
        basicDetails: newBasic
      };
    case UPDATE_BASIC:
      const basicIndex = state.userProducts.findIndex(
        prod => prod.id === action.pid
      );
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[basicIndex].ownerId,
        action.basicData.title,
        action.basicData.imageUrl,
        action.basicData.description,
        state.userProducts[basicIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[basicIndex] = updatedProduct;
      const availableProductIndex = state.availableProducts.findIndex(
        prod => prod.id === action.pid
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts
      };
  }
  return state;
};
