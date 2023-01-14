import React, { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import logo from '../Images/AR-logo.png';
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Outlet } from 'react-router';
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import {  Nav } from 'react-bootstrap';
import { login } from "../actions/userAction";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from 'react-router-dom';
import UserRole from "./UserRole";

// import axios from "../api/axios";
// const LOGIN_URL = '/auth/login';
// var authorize = false;

// const email2="";

// export function sendName(){
//     return (
//         email2
//     )
// }

export const Login = ( props) => {
    const { setAuth } = useContext(AuthContext);
    const emailRef = useRef();
    const errRef = useRef();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const {  loading, error, userInfo } = userLogin;

    const adminLogin = useSelector((state) => state.adminLogin);
    const { adminInfo } = adminLogin;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (userInfo) {
          navigate('/');
        }
        else if (adminInfo){
            console.log("This is admin")
            navigate('/admin');
        }
    }, [navigate, userInfo, adminInfo]);

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password);
        dispatch(login(email, password));
        setEmail('');
        setPassword('');
        // authorize = userInfo.hasOwnProperty('email') && userInfo.email !== undefined;
        // console.log(authorize);
        // if (typeof userInfo !== 'undefined' && userInfo !== null && userInfo.hasOwnProperty('email')) {
        //     authorize = userInfo.hasOwnProperty('email');
        //     console.log(authorize);
        // }
        // console.log(authorize);
        //setSuccess(true);
        // console.log('email:'+email, 'password:'+pass);

        //try {
            // const response = await axios.post(LOGIN_URL,
            //     JSON.stringify({email : email, password : password}),
            //     {
            //         headers: { 'Content-Type' : 'application/json' },
            //         withCredentials: false
            //     }
            // );
            // // email2 = email;
            // console.log(JSON.stringify(response));
            // // console.log(JSON.stringify(response?.data));
            
            // const accessToken = response?.data?.accessToken;
            // setAuth({email, password, accessToken});
            // setEmail('');
            // setPassword('');
            // setSuccess(true);

        // } catch (err) {
        //     if (!err?.response) {
        //         setErrMsg('No Server Response');
        //     } else if (err.response?.status === 400) {
        //         // setErrMsg('Missing username or password');
        //         setErrMsg('Incorrect username or password');
        //     } else if (err.response?.status === 401) {
        //         // setErrMsg('Unauthorized');
        //         setErrMsg('Incorrect username or password');
        //     } else {
        //         setErrMsg('Login Failed');
        //     }
        //     errRef.current.focus();
        // }

        
    }

    return (
        <div className="super-cont">
            {/* {authorize === true ? ( */}
                {/* // <section>
                //     <h1>You are logged in!</h1>
                //     <br />
                //     <p>
                //         <a href="#">Go to Home</a>
                //     </p>
                // </section>`
                <div>
                 {loading && <Loading />}
                
                     <Routes>
                     <Route
                         path="*"
                         element={<Navigate to="/" replace />}
                     />
                    </Routes>
                </ div>
            ) : (   */}

        <div className="login-form">
            <div className="auth-form-container">
                <Nav.Link as={Link} to={"/"}><img src={logo} className="App-logo-signin" alt="logo" /></ Nav.Link>
                {/* <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                    {errMsg}    
                </p> */}
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {loading && <Loading />}
                <form className="login-form" onSubmit={handleSubmit}>

                    <div className="email-label"><MdEmail style={{fontSize:'25px'}}/><label htmlFor="email">Email</label></div>
                    <input 
                        value={email} 
                        type="email" 
                        //placeholder="youremail@email.com" 
                        id="email"
                        ref={emailRef}
                        autoComplete="off" 
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    /> 

                    <div className="pass-label"><FaLock style={{fontSize:'25px'}}/><label htmlFor="password">Password</label></div>
                    <input
                        value={password} 
                        type="password" 
                        //placeholder="*********" 
                        id="password" 
                        onChange={(e) => setPassword(e.target.value)}  
                        required
                    /> 

                    <button className="login" type="submit">Log In</button>
                    <div>
                        <button className="forgot-pass"><span style={{color:"red"}}>Forgot Password?</span></button>
                    </div>
                </form>
            </div>
            <div>
                <Nav.Link as={Link} to={"/register"}>
                    <button className="link-btn">Don't have an account?<span style={{color:"#003366"}}> Sign Up</span></button>
                </Nav.Link>
            </div>
            
        </div>
        {/* }   */}
        </div>
    )
}

export default Login;