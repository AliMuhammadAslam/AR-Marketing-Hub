import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  adminLoginReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducer";
import{
  eventListReducer
} from "./reducers/eventReducer";
import{
  productListReducer
} from "./reducers/productReducer";
import{
  aboutListReducer
} from './reducers/aboutReducer';
import{
  homeListReducer
} from './reducers/homeReducer';

const reducer = combineReducers({
  adminLogin: adminLoginReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  eventList: eventListReducer,
  productList: productListReducer,
  aboutList: aboutListReducer,
  homeList: homeListReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// const initialState = {
//   userLogin: { userInfo: userInfoFromStorage },
// };

const adminInfoFromStorage = localStorage.getItem("adminInfo")
  ? JSON.parse(localStorage.getItem("adminInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  adminLogin: { adminInfo: adminInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;