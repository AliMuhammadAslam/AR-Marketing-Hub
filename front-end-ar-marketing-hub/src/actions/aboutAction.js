import {
    ABOUT_LIST_REQUEST,
    ABOUT_LIST_SUCCESS,
    ABOUT_LIST_FAIL,
  } from "../constants/aboutConstant";

import axios from "../api/axios";
const ABOUT_LIST_URL = '/auth/about';

export const listAbout = () => async (dispatch) => {
    try {
      dispatch({
        type: ABOUT_LIST_REQUEST,
      });
  
      // const {
      //   userLogin: { userInfo },
      // } = getState();
  
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${userInfo.accessToken}`,
      //   },
      // };
  
      const  {data}  = await axios.get(ABOUT_LIST_URL);
      //console.log(data)
      const {about} = data;  
      
      dispatch({
        type: ABOUT_LIST_SUCCESS,
        payload: about,
      });
      //localStorage.setItem("about", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: ABOUT_LIST_FAIL,
        payload: message,
      });   
    }
  };