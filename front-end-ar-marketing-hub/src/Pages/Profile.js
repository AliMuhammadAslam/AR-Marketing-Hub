import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import proPic from '../Images/profpic.png';
import { Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../actions/userAction";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { userLogout } from "../actions/userAction";

    

function Profile() {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    let navigate = useNavigate(); 
    const dispatch = useDispatch();

    const [name, setName] = useState(userInfo?.name);
    const [contact, setContact] = useState(userInfo?.contact);
    const [address, setAddress] = useState(userInfo?.address);

    
    useEffect(() => {
        if (!userInfo) {
           navigate('/');
        // props.onFormSwitch('login');
        }
    }, [navigate, userInfo]);
    const logoutHandler = () => {
        dispatch(userLogout());

        navigate('/');
    };

    const refreshPage = () => {
        window.location.reload();
        //navigate('/admin/products');
    }

    let updateInfo = (e) => {
        
        try {
            
        
            e.preventDefault();
            console.log('Submitted values: ' + userInfo.id, name, contact, address);
            dispatch(updateUser(userInfo.id, name, contact, address));
            // setDesc('');
            //          setID('');
            //          setImage('');
            //          setLink('');
            //          setName('');
            
            confirmAlert({
                            title: 'User Updated',
                            message: 'User Info has been updated!',
                            buttons: [
                                {
                                    label: 'Ok',
                                    onClick: () => { logoutHandler(); }
                                },
                            ]
                        });
                
                      
            
                //dispatch(addProd(id, description, name, link, image));
                
        } catch (error) {
            console.log(error);
        }}

    return (
        // <div>THIS IS About</div>

        <div>

            <Row className="profileContainer">
                <Col md={6}>
                    {/* <Form onSubmit={submitHandler}>
                            {loading && <Loading />}
                            {success && (
                                <ErrorMessage variant="success">
                                    Updated Successfully
                                </ErrorMessage>
                            )} */}
                    <Form>
                        {/* {error && <ErrorMessage variant="danger">{error}</ErrorMessage>} */}
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                // placeholder={`${userInfo.name}`}
                                value={name}//{name}
                                onChange={(e) => setName(e.target.value)}
                            // onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                defaultValue={`${userInfo?.email}`}
                                disabled={true}
                                //{email}
                            // onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="contactNumber">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Contact N.o"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="adress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}

                            // value={confirmPassword}
                            // onChange={(e) => setConfirmPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>{" "}
                        {/* {picMessage && (
                                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                            // )} */}
                        {/* <Form.Group controlId="proPic">
                            <Form.Label>Change Profile Picture</Form.Label>
                            <Form.File
                                // onChange={(e) => postDetails(e.target.files[0])}
                                id="custom-file"
                                type="image/png"
                                label="Upload Profile Picture"
                                custom
                            />
                        </Form.Group> */}
                        <Button type="submit" varient="primary" onClick={updateInfo}>Update</Button>
                    </Form>
                </Col>
                <Col
                    style={{
                        display:"grid",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {/* <img src={pic} alt={name} className="profilePic" /> */}
                    <a><img src={proPic} className="profile-pic" alt="proPic" /></a><br></br>
                    
                    {/* <a><Button type="submit" varient="primary">
                            Change Profile Picture
                        </Button></a> */}
                </Col>
            </Row>
        </div>
    )

}

export default Profile;