import React, { Component } from 'react';
import { useRef, useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link, Redirect, useParams, } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { addProd, listProducts, updateProd } from "../actions/productAction";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from 'react-router-dom';
import logo from '../Images/AR-logo.png';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from "../api/axios";
import { MdLink, MdImage, MdDescription, MdFilter1, MdOutlineSmartphone, MdLocationOn, MdEvent
 } from "react-icons/md";
import { addEvent, listEvents, updateEvent } from '../actions/eventAction';


function UpdateEvent() {
    // const [id, setID] = useState('');
    

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const eventList = useSelector((state) => state.eventList);
    const { loading, error, events } = eventList;

    const adminLogin = useSelector((state) => state.adminLogin);
    const { adminInfo } = adminLogin;

  useEffect(() => {
    if (!adminInfo) {
       navigate('/');
    // props.onFormSwitch('login');
    }
}, [navigate, adminInfo]);

     useEffect(() => {
         
        dispatch(listEvents());
        // if (products){
        //     const myArray = Object.values(products);
        // }
    //     //getAbout("why ???");
    //     // if (!userInfo) {
    //     //   navigate('/');
    //     // }
     }, [
        // dispatch,
    //     //navigate,
    //    // userInfo,
     ]);

    

    //products = JSON.parse(products);

    let { event_id } = useParams();
    event_id = parseInt(event_id, 10);
    //console.log(params);
    const [id, setID] = useState(event_id);
    // const [description, setDesc] = useState('');
    // const [name, setName] = useState('');
    // const [link, setLink] = useState('');
    // const [image, setImage] = useState('');
    
      

    var filtered = [];
    filtered = events?.find((event) => {
        return event.Event_ID === id;
      });
      //const myArray = Object.values(filtered);

      const [description, setDesc] = useState(filtered?.Description);
      const [name, setName] = useState(filtered?.Event_Name);
      const [location, setLocation] = useState(filtered?.Location);
      const [image, setImage] = useState(filtered?.Image);
      const [price, setPrice] = useState(filtered?.Ticket_Price);
      const [charge, setCharge] = useState(filtered?.Delivery_Charge);

    //   if (products){
    //   setDesc(filtered.Description);
    // setName(filtered.Product_Name);
    // setLink(filtered.Link);
    // setImage(filtered.Image);
    //   };
    
    //products.Product_ID==3
    //const [id, setID] = useState(''));
    console.log("Event_ID: "+id+", Filtered Event: "+filtered);

    // useEffect(() => {
    //     if (userInfo) {
    //        navigate('/signin');
    //     // props.onFormSwitch('login');
    //     }
    // }, [navigate, userInfo]);

    const refreshPage = () => {
        window.location.reload();
        //navigate('/admin/products');
    }

    const [post, setPost] = useState('');


    let handleSubmit = (e) => {
        
try {
    // const config = {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     withCredentials: false
    //   };
    // const newProd = { "name": name,
    // "desc": description,
    // "link": link,
    // "image": image
    // };
    // console.log('Submitted values: ' + id, name, description, image, link);
    // await axios.post(`http://localhost:3500/auth/update_product/${product_id}`, newProd, config
    // ).then((response) => {
    //     navigate("/admin/products")
    //          setPost(response.data);
    //          console.log(post);
    //          setDesc('');
    //          setID('');
    //          setImage('');
    //          setLink('');
    //          setName('');
    //          confirmAlert({
    //             title: 'Product Added',
    //             message: 'Product with Product_ID ' + id + ' has been updated!',
    //             buttons: [
    //                 {
    //                     label: 'Ok',
    //                     onClick: () => { navigate("/admin/products") }
    //                 },
    //             ]
    //         });

    //        });

    e.preventDefault();
    console.log('Submitted values: ' + id, name, description, image, location, price, charge);
    dispatch(updateEvent(event_id, id, name, description, location, image, price, charge));
    // setDesc('');
    //          setID('');
    //          setImage('');
    //          setLink('');
    //          setName('');
    confirmAlert({
                    title: 'Event Updated',
                    message: 'Event with Event_ID ' + id + ' has been updated!',
                    buttons: [
                        {
                            label: 'Ok',
                            onClick: () => { refreshPage() }
                        },
                    ]
                });
        //dispatch(addProd(id, description, name, link, image));
        
} catch (error) {
    console.log(error);
}

        

    }


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
                            disabled={true}
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
                            placeholder="rs. " 
                            id="price"
                            name="price"
                            required
                        />

<div className="charge-label">
                            <MdImage style={{ fontSize: '25px' }} />
                            <label htmlFor="image">Delivery Charges</label></div>
                        <input
                            value={charge}
                            onChange={(e) => setCharge(e.target.value)}
                            type="number"
                            placeholder="Rs. " 
                            id="charge"
                            name="charge"
                            required
                        />

                        <button className="add-event" type="submit">Update Event</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateEvent;