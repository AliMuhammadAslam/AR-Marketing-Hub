import React, { useState, useEffect } from "react"
import logo from '../Images/AR-logo.png';
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {BrowserRouter as Router, Routes, Route, Link, Redirect} from "react-router-dom"
import {  Nav } from 'react-bootstrap';
import { register } from "../actions/userAction";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from 'react-router-dom';

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    // const logoutHandler = () => {
    //     dispatch(logout());
    //     navigate('/');
    //   };

    useEffect(() => {
        if (userInfo) {
           navigate('/signin');
        // props.onFormSwitch('login');
        }
    }, [navigate, userInfo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('email: '+email);
        dispatch(register(name, email, password));
    }

    return (
        <div className="super-cont">
        <div className="register-form">
            <div className="auth-form-container">
            <Nav.Link as={Link} to={"/"}><img src={logo} className="App-logo-signin" alt="logo" /></ Nav.Link>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {/* {message && <ErrorMessage variant="danger">{message}</ErrorMessage>} */}
        {loading && <Loading />}
                <form className="register-form" onSubmit={handleSubmit}>
                    
                    <div className="name-label"><MdPerson style={{fontSize:'25px'}}/><label htmlFor="name">Name</label></div>
                    <input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    name="name" 
                    id="name" 
                    placeholder="Full Name"
                    autoComplete="off"
                    required
                    />

                    <div className="email-label"><MdEmail style={{fontSize:'25px'}}/><label htmlFor="email">Email</label></div>
                    <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    type="email" 
                    placeholder="youremail@email.com" 
                    id="email" 
                    name="email"
                    autoComplete="off"
                    required
                    /> 

                    <div className="pass-label"><FaLock style={{fontSize:'25px'}}/><label htmlFor="password">Password</label></div>
                    <input 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    type="password" 
                    // placeholder="*********" 
                    id="password" 
                    name="password"
                    required
                    /> 

                    <button className="register" type="submit">Sign Up</button>
                </form>
            </div>
            <div>
            <Nav.Link as={Link} to={"/signin"}>
                <button className="link-btn">Already have an account? <span style={{color:"#003366"}}> Log In</span></button>
            </Nav.Link>
            </div>
        </div>
        </div>
    )
}

export default Register;