import {
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAIL,
} from "../constants/productConstant";

import axios from "../api/axios";
const PRODUCTS_LIST_URL = '/auth/products';
const ADD_PRODUCTS_URL = '/auth/add_product';
const UPDATE_PRODUCTS_URL = '/auth/update_product/';

export const listProducts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCTS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${userInfo.accessToken}`,
    //   },
    // };

    const { data } = await axios.get(PRODUCTS_LIST_URL);
    const { products } = data;

    dispatch({
      type: PRODUCTS_LIST_SUCCESS,
      payload: products,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRODUCTS_LIST_FAIL,
      payload: message,
    });
  }
};


export const addProd = (id, name, desc, link, image) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_LIST_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: false
    };
    console.log(id, name, desc, link, image);
    const { data } = await axios.post(
      ADD_PRODUCTS_URL,
      JSON.stringify({ Product_ID: id, Product_Name: name, Description: desc, Link: link, Image: image }),
      config
    );

    dispatch({ type: PRODUCTS_LIST_SUCCESS, payload: data });

    // dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    //localStorage.setItem("userInfo", JSON.stringify(data));

  } catch (error) {
    dispatch({
      type: PRODUCTS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const updateProd = (product_id, id, name, desc, link, image) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_LIST_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: false
    };
    console.log(id, name, desc, link, image);
    const { data } = await axios.post(
      `/auth/update_product/${product_id}`,
      JSON.stringify({ name: name, desc: desc, link: link, image: image }),
      config
    );

    dispatch({ type: PRODUCTS_LIST_SUCCESS, payload: data });

    // dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    //localStorage.setItem("userInfo", JSON.stringify(data));

  } catch (error) {
    dispatch({
      type: PRODUCTS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

