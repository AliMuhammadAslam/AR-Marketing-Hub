import React, { useRef, useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from '../Images/any-min-now.png';
import logo2 from '../Images/AR-logo.png';
import './Events.css'
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { listEvents } from "../actions/eventAction";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from 'react-router-dom';
import axios from "../api/axios";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { adminLogout } from "../actions/userAction";
import './adminEvent.css';
function AdminEvents() { 
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

  const [post, setPost] = useState('');

  const eventList = useSelector((state) => state.eventList);
  const { loading, error, events } = eventList;

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;
let  value =0;
  useEffect(() => {
    dispatch(listEvents());
    // value =1;
    // if (value==0){
    //   refreshPage();
    }
    //refreshPage();
    //getAbout("why ???");
    // if (!userInfo) {
    //   navigate('/');
    // }
, [
    dispatch,
    navigate,
   // userInfo,
]);

const logoutHandler = () => {
    dispatch(adminLogout());
    navigate('/');
  };

const refreshPage = ()=>{
    window.location.reload();
 }

let deleteEvent = async(Event_ID) => {
    try {
        await axios.get(`http://localhost:3500/auth/delete_event/${Event_ID}`).then((response) => {
         setPost(response.data);
       });
      //{about} = data; 
      console.log("Event deleted")
      confirmAlert({
        title: 'Event Deleted',
        message: 'Event with Event_ID '+Event_ID+'has been deleted!',
        buttons: [
          {
            label: 'Ok',
            onClick: () => {refreshPage()}
          },
        ]
      });
      //navigate('/admin/products');
    } catch (error) {
        console.log(error);
    }
      
};

  return (
    <div>
    <div>
    <nav className="navbar navbar-default">

      <div className="container-fluid">

        <div className="navbar-header">
          <div className="navbar-brand"><Nav.Link as={Link} to={"/admin/"}><img src={logo2} className="App-icon" alt="logo" /></Nav.Link></div>
        </div>
        <ul className="nav navbar-nav">
        <Nav.Link as={Link} to={"/admin/addEvent"}><button className="add-event">Add Event</button></Nav.Link>
        <button onClick ={() => { logoutHandler() }}>Logout</button>
            
          </ul>
      </div>
    </nav>
  </div>
    <div className="super-event-cont">
     
        {/* <Nav.Link as={Link} to={"/admin/"}><button className="admin-home">Home</button></Nav.Link> */}
        {/* <button onClick={() => { logoutHandler() }}>Logout</button> */}
      {console.log(events)}
      <div className="header"><h1>Events</h1></div>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
     
      {events && events.map(event => (
        <div className="event-container" key={event._id}>
          <a><img src={event.Image} className="event-image" alt="logo" /> </a>
          <h1>{event.Event_Name}</h1>
          <a>{event.Description}</a><br />
          {/* {userInfo ? (
            <a>
              <Nav.Link as={Link} to={`/ticket/${event.Event_ID}`}><button className="book-a-ticket">get your ticket</button></Nav.Link>
            </a>
          ) : (
            <a>
              <Nav.Link as={Link} to={"/signin"}><button className="book-a-ticket">Sign In to get your ticket</button></Nav.Link>
            </a>
          )} */}
          <div className="buttonCon1">
          
                       <a><button className="delete-event" 
                        onClick ={() => { deleteEvent(event.Event_ID)}}
                        //  onClick={deleteProd && this.deleteProd}
                        // onClick={function(e) {
                        //     this.deleteProd(product.Product_ID); //can pass arguments this.btnTapped(foo, bar);          
                        //   }}
                          >Delete Event</button></a>
                          <Nav.Link as={Link} to={`/admin/updateEvent/${event.Event_ID}`}><button className="update-event">Update Event</button></Nav.Link>
                    

        </div>
        </div>
      ))}
      
    </div>
    </div>
  )
}


export default AdminEvents;