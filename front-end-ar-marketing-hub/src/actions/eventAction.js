import {
    EVENTS_LIST_REQUEST,
    EVENTS_LIST_SUCCESS,
    EVENTS_LIST_FAIL,
  } from "../constants/eventConstant";

import axios from "../api/axios";
const EVENT_LIST_URL = '/auth/events';
const ADD_EVENT_URL = '/auth/add_event';

export const listEvents = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: EVENTS_LIST_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${userInfo.accessToken}`,
      //   },
      // };
  
      const  {data}  = await axios.get(EVENT_LIST_URL);
      const {events} = data;  
      
      dispatch({
        type: EVENTS_LIST_SUCCESS,
        payload: events,
      });
      localStorage.setItem("events", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: EVENTS_LIST_FAIL,
        payload: message,
      });   
    }
  };


  export const addEvent = (id, name, desc, location, image, price, charge) => async (dispatch) => {
    try {
      dispatch({ type: EVENTS_LIST_REQUEST });
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: false
      };
      console.log(id, name, desc, location, image);
      const { data } = await axios.post(
        ADD_EVENT_URL,
        JSON.stringify({ Event_ID: id, Event_Name: name, Description: desc, Location: location, Image: image, Ticket_Price: price, Delivery_Charge: charge }),
        config
      );
  
      dispatch({ type: EVENTS_LIST_SUCCESS, payload: data });
  
      // dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
      //localStorage.setItem("userInfo", JSON.stringify(data));
  
    } catch (error) {
      dispatch({
        type: EVENTS_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


  export const updateEvent = (event_id, id, name, desc, location, image, price, charge) => async (dispatch) => {
    try {
      dispatch({ type: EVENTS_LIST_REQUEST });
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: false
      };
      console.log(id, name, desc, location, image);
      const { data } = await axios.post(
        `/auth/update_event/${event_id}`,
        JSON.stringify({ name: name, desc: desc, location: location, image: image, price: price, charge:charge }),
        config
      );
  
      dispatch({ type: EVENTS_LIST_SUCCESS, payload: data });
  
      // dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
      //localStorage.setItem("userInfo", JSON.stringify(data));
  
    } catch (error) {
      dispatch({
        type: EVENTS_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  
  // export const register = (name, email, password) => async (dispatch) => {
  //   try {
  //     dispatch({ type: USER_REGISTER_REQUEST });
  
  //     const config = {
  //       headers: {
  //         'Content-Type' : 'application/json',
  //       },
  //       withCredentials: false
  //     };
  //     console.log(name, email, password);
  //     const { data } = await axios.post(
  //       REGISTER_URL,
  //       JSON.stringify({ name:name, email:email, password:password }),
  //       config
  //     );
  
  //     dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  
  //     dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
  //     localStorage.setItem("userInfo", JSON.stringify(data));

  //   } catch (error) {
  //     dispatch({
  //       type: USER_REGISTER_FAIL,
  //       payload:
  //         error.response && error.response.data.message
  //           ? error.response.data.message
  //           : error.message,
  //     });
  //   }
  // };
