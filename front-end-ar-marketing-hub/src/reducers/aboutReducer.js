import {
    ABOUT_LIST_REQUEST,
    ABOUT_LIST_SUCCESS,
    ABOUT_LIST_FAIL,
  } from "../constants/aboutConstant";

  export const aboutListReducer = (state = { about: [] }, action) => {
    switch (action.type) {
      case ABOUT_LIST_REQUEST:
        return { loading: true };
      case ABOUT_LIST_SUCCESS:
        return { loading: false, about: action.payload };
      case ABOUT_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  