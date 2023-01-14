import React, { useRef, useState, useEffect, useContext } from "react";
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    ADMIN_LOGIN_FAIL,
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGOUT,

  } from "../constants/userConstant";
  // import { useHistory } from "react-router-dom";
  import { useNavigate } from 'react-router-dom';
//   import axios from "axios";
import axios from "../api/axios";
const LOGIN_URL = '/auth/login';
const REGISTER_URL = '/auth/register';


// import {BrowserRouter as Router, Routes, Route, Link, Navigate} from "react-router-dom";
// import Loading from "../components/Loading";
  
  export const login = (email, password) => async (dispatch) => {
    // const [success, setSuccess] = useState('');
    // const { loading } = userLogin;
    // const [errMsg, setErrMsg] = useState('');
    var errMsg = ""; 
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
  
      const config = {
        headers: {
            'Content-Type' : 'application/json',
        },
        withCredentials: false
      };
      //console.log(email,password);
      const { data } = await axios.post(
        LOGIN_URL,
        // { email:email, password:password },
        JSON.stringify({email : email, password : password}),
        config
      );
        if (data.isAdmin == false){
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
        } else {
          //console.log(data);
          dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data });
          localStorage.setItem("adminInfo", JSON.stringify(data));
        }
      // this.props.history.push('/');  

    } catch (error) {
      
            if (!error?.response) {
              // setErrMsg('No Server Response');
              errMsg="No Server Response";
            } else if (error.response?.status === 400) {
              // setErrMsg('Missing username or password');
              //setErrMsg('Incorrect username or password');
              errMsg="Incorrect username or password";
          } else if (error.response?.status === 401) {
              // setErrMsg('Unauthorized');
              //setErrMsg('Incorrect username or password');
              errMsg="Incorrect username or password"
          } else {
            //setErrMsg('Login Failed');
            errMsg="Login Failed";
          }
          console.log(
          error.response && error.response.data.message
             ? error.response.data.message
             : error.message)
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          // errMsg,
          errMsg
        // error.response && error.response.data.message
        //     ? error.response.data.message
        //     : error.message,
        
       
      });
    }
  };
  
  export const userLogout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    // localStorage.removeItem("adminInfo");
    dispatch({ type: USER_LOGOUT });
  };

  export const adminLogout = () => async (dispatch) => {
    localStorage.removeItem("adminInfo");
    dispatch({ type: ADMIN_LOGOUT });
  };
  
  export const register = (name, email, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
  
      const config = {
        headers: {
          'Content-Type' : 'application/json',
        },
        withCredentials: false
      };
      console.log(name, email, password);
      const { data } = await axios.post(
        REGISTER_URL,
        JSON.stringify({ name:name, email:email, password:password, isAdmin:false }),
        config
      );
  
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  // export const updateProfile = (user) => async (dispatch, getState) => {
  //   try {
  //     dispatch({ type: USER_UPDATE_REQUEST });
  
  //     const {
  //       userLogin: { userInfo },
  //     } = getState();
  
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${userInfo.token}`,
  //       },
  //     };
  
  //     const { data } = await axios.post("/api/user", user, config);
  
  //     dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  
  //     dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
  //     localStorage.setItem("userInfo", JSON.stringify(data));
  //   } catch (error) {
  //     dispatch({
  //       type: USER_UPDATE_FAIL,
  //       payload:
  //         error.response && error.response.data.message
  //           ? error.response.data.message
  //           : error.message,
  //     });
  //   }
  // };
  export const updateUser = (id, name, contact, address) => async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: false
      };
      console.log(id, name, contact, address);
      const { data } = await axios.post(
        `/auth/update_profile/${id}`,
        JSON.stringify({ name: name, contact: contact, address:address}),
        config
      );
  
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
      // dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
  
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  