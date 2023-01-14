import React, { useRef, useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes,
    useParams,
  } from "react-router-dom";
  import { useSearchParams } from "react-router-dom";
  import { useLocation } from "react-router-dom"
  import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MdRadioButtonChecked } from "react-icons/md";
import { MdRadioButtonUnchecked, MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import './Ticket.css';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import axios from "../api/axios";
import {RadioGroup, FormControl, Radio, FormControlLabel, FormLabel, FormGroup, Checkbox, useIsFocusVisible} from '@mui/material';
import { Nav } from 'react-bootstrap';
import { listEvents } from '../actions/eventAction';
// import Popup from 'reactjs-popup';



function Ticket() {
    const [number, setNumber] = useState(0);
    const [price, setPrice] = useState(0);
    const[total, setTotal] = useState(0);
    const[value, setValue] = useState(0);

    const dispatch = useDispatch();

const handleChange = ()=>{
    number ++;
}
const handleDec = ()=>{
    if (number>0) {
        setNumber(number-1);
        setPrice(price-filtered?.Ticket_Price);
        decreaseTotal(price);

        
      }
    
}
const handleClick = ()=>{
    setNumber(number+1)
    setPrice(price+filtered?.Ticket_Price)
    handleTotal(price)
}
const handleTotal = (a)=>{
    setTotal(a+filtered?.Ticket_Price+filtered?.Delivery_Charge)
}
const decreaseTotal = (a)=>{
    if(total == 2250){
        setTotal(0)
    }
    else{setTotal(a-filtered?.Ticket_Price+filtered?.Delivery_Charge)}
    
}
const handleValue = (a)=>{
    
}







    let navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const eventList = useSelector((state) => state.eventList);
    const {events } = eventList;

    const location = useLocation()
    const params = new URLSearchParams(location.search)
    
  

    let { Event_ID } = useParams();
    Event_ID = parseInt(Event_ID, 10);
    //console.log(params);
    const [id, setID] = useState(Event_ID);
    //console.log(params);
    console.log(Event_ID);

    var filtered = [];
    filtered = events?.find((event) => {
        return event.Event_ID === id;
      });
      const myArray = Object.values(filtered);
      console.log(myArray);

    let postTicket = async() => {
        try {
            const body = {
                "Event_ID": filtered?.Event_ID,
                "Event_Name": filtered?.Event_Name,
                "Description": filtered?.Description,
                "Image": filtered?.Image,
                "User_ID": userInfo.User_ID,
                "Quantity":number,
                "Price":filtered?.Ticket_Price,
                "Total": total
                
              }
            await axios.post('http://localhost:3500/auth/add_ticket',body)
            navigate('/events');
            
        } catch (error) {
            
            console.log(error);
        }
        
        

    }
    
    let submit = async() => {
        
        
        //   await axios.post('http://localhost:3500/auth/add_ticket',body)
        confirmAlert({
          title: 'Order Confirmation',
          message: 'Do you confirm this order?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {postTicket()}
            },
            {
              label: 'No',
              onClick: () => <Nav.Link as={Link} to={`/ticket/${filtered?.Event_ID}`}></Nav.Link>
            }
          ]
        });
      };
    
    useEffect(() => {
        // if (!events) {
        //    navigate('/');
        // props.onFormSwitch('login');
        // }
        // dispatch(listEvents());
    }, [navigate, dispatch]);

    useEffect(() => {
        if (!userInfo) {
           navigate('/');
        // props.onFormSwitch('login');
        }
    }, [navigate, userInfo]);

    

    return ( 
    <div className="ticket-super-container">
        <div className="ticket-header" style={{fontFamily:'Futura-bold'}}><h1>Book Your Ticket</h1></div><br/>
        <img src={events && filtered?.Image} className="ticket-pic" alt="ticket-pic" ></img>
        <h2>{events && filtered?.Event_Name}</h2>
        <a style={{fontFamily:'Futura-light'}}>{events && filtered?.Description}</a><br/><br/>
        <h4 style={{fontFamily:'Futura-bold'}}>Order Summary</h4>
        <Container className="ticket-info">
        <Row style={{fontFamily:'Futura-bold'}}>
            <Col>Ticket</Col>
            <Col>Quantity</Col>
            <Col>Price</Col>
        </Row>   
        <Row style={{fontFamily:'Futura-medium'}}>
            <Col>Standard</Col>
            <Col>
                <div>
                    {/* <label></label> */}
                    <input value={number} onChange={handleChange}></input>
                    <button onClick={handleDec}>Decrease</button>
                    <button onClick={handleClick}>Increase</button>
                </div>
            </Col>
            <Col><input value={events && filtered?.Ticket_Price} onChange={handleChange}></input></Col>
        </Row> 
        <br/>
        <Row style={{fontFamily:'Futura-bold'}}>
            <Col>Sub Total</Col>
            <Col>  </Col>
            <Col><input value={price} onChange={handleChange}></input></Col>
        </Row> 
        <Row style={{fontFamily:'Futura-bold'}}>
            <Col>Delivery Cost</Col>
            <Col>  </Col>
            <Col><input value={events && filtered?.Delivery_Charge} onChange={handleChange}></input></Col>
        </Row> 
        <Row style={{fontFamily:'Futura-bold'}}>
            <Col>Total</Col>
            <Col>  </Col>
            <Col><input value={total} onChange={handleChange}></input></Col>
        </Row> 
        </Container>
        <br/><br/><br/>
        <h4 style={{fontFamily:'Futura-bold'}}>Delivery Information</h4>
        <Container className="user-info">
        <Row style={{fontFamily:'Futura-medium'}}>
            <Col>{userInfo.name}</Col>
        </Row>   
        <Row style={{fontFamily:'Futura-medium'}}>
            <Col>{userInfo.email}</Col>
        </Row> 
        <br/>
        {/* <Row style={{fontFamily:'Futura-medium'}}>
            <Col>Payment Method</Col>
        </Row>  */}
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">Payment Method</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        defaultValue="Cash"
                        value={value}
                        onChange={handleValue}
                    >
                        <FormControlLabel value="Cash" control={<Radio checked/>} label="Cash on Delivery" />
                        {/* <FormControlLabel value="Card" control={<Radio />} label="Credit Card" /> */}
                    </RadioGroup>
                </FormControl>
        {/* <Row style={{fontFamily:'Futura-medium'}}>
            <Col><MdRadioButtonChecked/>Cash on Delivery</Col>
        </Row> 
        <Row style={{fontFamily:'Futura-medium'}}>
            <Col><MdRadioButtonUnchecked/>Credit Card</Col>
        </Row>  */}
        <br/>
        <Row style={{fontFamily:'Futura-medium'}}>
            {/* <Col>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox hecked color="success"/>} label="I agree to the terms and conditions."/>
                            <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
                        </FormGroup>
            </Col> */}
            <Col></Col>
            <Col></Col>
            <Col><button className="confirm-ticket" onClick={submit}>Confirm Order</button></Col>
        </Row> 
        </Container>
    </div>
    )

}

export default Ticket;