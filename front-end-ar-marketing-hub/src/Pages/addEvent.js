import React, { Component } from 'react';
import { useRef, useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { addProd, listProducts } from "../actions/productAction";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from 'react-router-dom';
import logo from '../Images/AR-logo.png';
import { MdLink, MdImage, MdDescription, MdFilter1, MdOutlineSmartphone, MdLocationOn, MdEvent
 } from "react-icons/md";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { addEvent, listEvents } from '../actions/eventAction';


function AddEvent() {
    const [id, setID] = useState('');
    const [description, setDesc] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [delCharge, setDelCharge] = useState('');

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const adminLogin = useSelector((state) => state.adminLogin);
    const { adminInfo } = adminLogin;

    const eventList = useSelector((state) => state.eventList);
    const { loading, error, events } = eventList;

//     const count = events?.length;
//     console.log("Count of events: "+ count);
//     console.log(events[count-1]?.Event_ID+1);

//   const [id, setID] = useState(events[count-1]?.Event_ID+1);

  useEffect(() => {
    if (!adminInfo) {
       navigate('/');
    // props.onFormSwitch('login');
    }
}, [navigate, adminInfo]);

//     const adminLogin = useSelector((state) => state.adminLogin);
//   const { adminInfo } = adminLogin;

    

    const refreshPage = () => {
        window.location.reload();
        //  dispatch(listEvents);
        //navigate('/admin/events');
    }

    let value =0;
    useEffect(() => {
        if (adminInfo) {
           dispatch(listEvents());
        //    if (events){
        //    setID((events[events.length-1].Event_ID)+1)};
        // props.onFormSwitch('login');
        }
    }, [dispatch, navigate]);

    // let length = 0;

    // if(events){
    //     length = events.length;
    //     console.log("Length of events array: "+length); 
    // }
    // const [id, setID] = useState((events[length-1].Event_ID)+1);
    // let length = events.length;
    // console.log("Length of events array: "+length);
    

    // const refreshPage = () => {
    //     window.location.reload();
    //     //navigate('/admin/events');
    // }

    console.log("id:"+id);

    const handleSubmit = (e) => {
        e.preventDefault();
        // setID(length);
        // console.log(length);
        //setID((events[events.length-1].Event_ID)+1)
        console.log('id: ' + id, name, description, image, price, delCharge);
        // setID(length);
        dispatch(addEvent(id, name, description, location, image, price, delCharge));
        confirmAlert({
            title: 'Event Added',
            message: name + ' with Event_ID ' + id + ' has been added!',
            buttons: [
                {
                    label: 'Ok',
                    onClick: () => { refreshPage() }
                },
            ]
        });

    }

    // let getID = () => {
    //     setID((events[events.length-1].Event_ID)+1)
    // }


    return (
        <div className="super-cont">
            <div className="add-prod-form">
                <div className="auth-form-container">
                    <Nav.Link as={Link} to={"/admin/events"}><img src={logo} className="App-logo-addProd" alt="logo " /></ Nav.Link>
                    {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                    {/* {message && <ErrorMessage variant="danger">{message}</ErrorMessage>} */}
                    {loading && <Loading />}
                    {/* {console.log(events.length)} */}
                    <form className="register-form" onSubmit={handleSubmit}>
                        {/* <button onClick={getID()}>
                            Generate ID
                        </button>  */}
                        <div className="id-label">
                            <MdFilter1 style={{ fontSize: '25px' }} />
                            <label htmlFor="id">Event ID</label></div>
                        <input
                            value={id
                                //  (events && (events[events.length-1].Event_ID)+1)
                            }
                            // {id}
                            onChange={(e) => setID(e.target.value)}
                            // {setID = useState(value)}
                            name="id"
                            id="id"
                            placeholder="Event ID"
                            autoComplete="off"
                            //disabled={true}
                            type="number"
                            required
                        />
                        
                        <div className="name-label">
                            <MdEvent style={{ fontSize: '25px' }} />
                            <label htmlFor="name">Event Name</label></div>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            name="name"
                            id="name"
                            placeholder="Name"
                            autoComplete="off"
                            required
                        />

                        <div className="desc-label">
                            <MdDescription style={{ fontSize: '25px' }} />
                            <label htmlFor="description">Event Description</label></div>
                        <input
                            value={description}
                            onChange={(e) => setDesc(e.target.value)}
                            name="description"
                            id="description"
                            placeholder="Decsription"
                            autoComplete="off"
                            required
                        />

                        <div className="location-label">
                            <MdLocationOn style={{ fontSize: '25px' }} />
                            <label htmlFor="link">Location</label></div>
                        <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            //type=""
                            placeholder="google maps"
                            id="location"
                            name="location"
                            autoComplete="off"
                            required
                        /> 

                        <div className="image-label">
                            <MdImage style={{ fontSize: '25px' }} />
                            <label htmlFor="image">Event Image URL</label></div>
                        <input
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            type="url"
                            placeholder="http://abc.jpg" 
                            id="iamge"
                            name="image"
                            required
                        />

<div className="price-label">
                            <MdImage style={{ fontSize: '25px' }} />
                            <label htmlFor="image">Ticket Price</label></div>
                        <input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            type="number"
                            placeholder="Rs. " 
                            id="price"
                            name="price"
                            required
                        />

<div className="charge-label">
                            <MdImage style={{ fontSize: '25px' }} />
                            <label htmlFor="image">Delivery Charges</label></div>
                        <input
                            value={delCharge}
                            onChange={(e) => setDelCharge(e.target.value)}
                            type="number"
                            placeholder="Rs. " 
                            id="charge"
                            name="charge"
                            required
                        />

                        <button className="add-event" type="submit">Add Event</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddEvent;