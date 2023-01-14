import {
    HOME_LIST_REQUEST,
    HOME_LIST_SUCCESS,
    HOME_LIST_FAIL,
  } from "../constants/homeConstant";

import axios from "../api/axios";
const HOME_LIST_URL = '/auth/home';

export const listHome = () => async (dispatch) => {
    try {
      dispatch({
        type: HOME_LIST_REQUEST,
      });
  
      // const {
      //   userLogin: { userInfo },
      // } = getState();
  
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${userInfo.accessToken}`,
      //   },
      // };
  
      const  {data}  = await axios.get(HOME_LIST_URL);
      //console.log(data)
      const {home} = data;  
      
      dispatch({
        type: HOME_LIST_SUCCESS,
        payload: home,
      });
      //localStorage.setItem("about", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: HOME_LIST_FAIL,
        payload: message,
      });   
    }
  };