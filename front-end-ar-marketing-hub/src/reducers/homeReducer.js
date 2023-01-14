import {
    HOME_LIST_REQUEST,
    HOME_LIST_SUCCESS,
    HOME_LIST_FAIL,
  } from "../constants/homeConstant";

  export const homeListReducer = (state = { home: [] }, action) => {
    switch (action.type) {
      case HOME_LIST_REQUEST:
        return { loading: true };
      case HOME_LIST_SUCCESS:
        return { loading: false, home: action.payload };
      case HOME_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  