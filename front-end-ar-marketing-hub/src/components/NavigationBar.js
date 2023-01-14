import React, { useState, useEffect } from 'react'
import logo from '../Images/AR-logo.png';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import './NavigationBar.css';
import { Nav, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../actions/userAction";
import { useNavigate } from 'react-router-dom';
import App from '../App';

function NavigationBar() {

  const dispatch = useDispatch();
  let navigate = useNavigate(); 

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(userLogout());
    navigate('/');
  };

  useEffect(() => { }, [userInfo]);

  console.log(userInfo);

  return (
    <div>
      <nav className="navbar navbar-default">

        <div className="container-fluid">

          <div className="navbar-header">
            <div className="navbar-brand"><Nav.Link as={Link} to={"/"}><img src={logo} className="App-icon" alt="logo" /></Nav.Link></div>
          </div>

          <ul className="nav navbar-nav">
            <li> <Nav.Link as={Link} to={"/"}>Home</Nav.Link></li>
            <li> <Nav.Link as={Link} to={"/about"}>About</Nav.Link></li>
            <li> <Nav.Link as={Link} to={"/products"}>Products</Nav.Link></li>
            <li> <Nav.Link as={Link} to={"/events"}>Events</Nav.Link></li>
            {/* <li><a href="#">Products</a></li>
                        <li><a href='#'>Events</a></li> */}
            {/* <li><a> <Nav.Link as={Link} to={"/signin"}>Sign In</Nav.Link></a></li>
                        <li><a> <Nav.Link as={Link} to={"/profile"}>Profile</Nav.Link></a></li>  */}
                        
            <Nav>
              {userInfo ? (
                <>
                  {/* <Nav.Link href="/profile">My Profile</Nav.Link> */}
                  <NavDropdown
                    title={`${userInfo.name}`}
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item href="/profile">
                      {/* <img
                      alt=""
                      src={`${userInfo.pic}`}
                      width="25"
                      height="25"
                      style={{ marginRight: 10 }}
                    /> */}
                      My Profile
                    </NavDropdown.Item>

                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav.Link href="/signin">Sign In</Nav.Link>
              )}
            </Nav>
            
            {/* <Nav.Link as={Link} to={"/login"}>Sign In</Nav.Link> */}
            {/* <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/profile">Profile</Link>  */}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default NavigationBar;