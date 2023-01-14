import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import logo from '../Images/AR-logo.png';
import './Admin.css'
import { adminLogout } from "../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
    const { adminInfo } = adminLogin;

  useEffect(() => {
    if (!adminInfo) {
       navigate('/');
    // props.onFormSwitch('login');
    }
}, [navigate, adminInfo]);

  const logoutHandler = () => {
    dispatch(adminLogout());
    navigate('/');
  };
  return (
    <div>
      <nav className="navbar navbar-default">

        <div className="container-fluid">

          <div className="navbar-header">
            <div className="navbar-brand"><Nav.Link as={Link} to={"/admin"}><img src={logo} className="App-icon" alt="logo" /></Nav.Link></div>
          </div>

          <ul className="nav navbar-nav">
          <button onClick ={() => { logoutHandler() }}>Logout</button>
            {/* <Nav.Link as={Link} to={"/admin/events"}><button className="event">Events</button></Nav.Link>
            <Nav.Link as={Link} to={"/admin/products"}><button className="prod">Products</button></Nav.Link> */}
            {/* <li><a href="#">Products</a></li>
                      <li><a href='#'>Events</a></li> */}
            {/* <li><a> <Nav.Link as={Link} to={"/signin"}>Sign In</Nav.Link></a></li>
                      <li><a> <Nav.Link as={Link} to={"/profile"}>Profile</Nav.Link></a></li>  */}





          </ul>
          
        </div>
      </nav>
      <div className='heading' style={{fontFamily:'Futura-bold', fontSize:'50px'}}>Admin Portal</div>
      <div className='btnCont'>
      <Nav.Link as={Link} to={"/admin/events"}><button className="event">Events</button></Nav.Link>
            <Nav.Link as={Link} to={"/admin/products"}><button className="prod">Products</button></Nav.Link>
            </div>
    </div>
  )
}
