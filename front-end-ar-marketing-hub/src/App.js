import React, { useState } from "react";
// import logo from './AR-logo.png';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Footer from "./components/Footer";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';
import './components/NavigationBar.css';
import { Outlet } from 'react-router';
import Home from "./Pages/Home";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import ErrorPage from "./Pages/ErrorPage";
import WithoutNav from "./components/WithoutNav";
import WithNav from "./components/WithNav";
import Events from "./Pages/Events";
import Products from "./Pages/Products";
import Ticket from "./Pages/Ticket";
import UserRole from "./Pages/UserRole";
import AdminProd from "./Pages/adminProducts";
import AddProd from "./Pages/addProduct";
import Admin from "./Pages/Admin";
import AdminEvents from "./Pages/adminEvents";
import AddEvent from "./Pages/addEvent";
import UpdateEvent from "./Pages/updateEvent";
import UpdateProduct from "./Pages/updateProduct";
import ImageUpload from "./Pages/ImageUpload";
// const {sendName} = require('./Pages/Login');


function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  // const name1 = sendName();
  return (

    <Router>
      <div className="App">
        <div>
          {/* <UserRole name = {name1} /> */}
          {/* <NavigationBar /> */}
          <Routes>
            <Route element={<WithoutNav />}>
              <Route path="/signin" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin/products" element={<AdminProd />} />
              <Route path="/admin/addProduct" element={<AddProd />} />
              <Route path="/admin/events" element={<AdminEvents />} />
              <Route path="/admin/addEvent" element={<AddEvent />} />
              <Route path="/admin/updateEvent/:event_id" element={<UpdateEvent />} />
              <Route path="/admin/updateProduct/:product_id" element={<UpdateProduct />} />
              <Route path="/admin/" element={<Admin />} />
            </Route>
            <Route element={<WithNav />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/events" element={<Events />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/ticket/:Event_ID" element={<Ticket />} />
              <Route path="/image" element={<ImageUpload />} />
              
              
              
              {/* <Route path="/userrole" element={<UserRole />} /> */}
              <Route path="*" element={<ErrorPage />} />
            </Route>
            {/* <Route element={<WithNavAfterLogin />}>
            <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/events" element={<Events />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/ticket" element={<Ticket />} />
              <Route path="/userrole" element={<UserRole />} />
              <Route path="*" element={<ErrorPage />} />
              
            </Route> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
