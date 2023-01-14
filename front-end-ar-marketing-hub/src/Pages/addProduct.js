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
import { MdLink, MdImage, MdDescription, MdFilter1, MdOutlineSmartphone } from "react-icons/md";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


function AddProduct() {
    // const [id, setID] = useState(products[count-1]?.Product_ID);
    const [description, setDesc] = useState('');
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [image, setImage] = useState('');

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const count = products?.length;
      console.log("Count of products: "+ count);
      console.log(products[count-1]?.Product_ID+1);

    const [id, setID] = useState(products[count-1]?.Product_ID+1);


    const adminLogin = useSelector((state) => state.adminLogin);
    const { adminInfo } = adminLogin;

    var filtered = [];
    filtered = products?.find((product) => {
        return product.Product_ID === id;
      });

      
      const [imageUp, setImageUp] = useState('')
      const [loadingUp, setLoadingUp] = useState(false)
    
      const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'darwin')
        setLoadingUp(true)
        const res = await fetch(
          '	https://api.cloudinary.com/v1_1/dcvjxvmgo/image/upload',
          {
            method: 'POST',
            body: data
          }
        )
        const file = await res.json()
    
        setImageUp(file.secure_url)
        setLoadingUp(false)
      }
      

      
      //setID(products[count-1]?.Product_ID);

  useEffect(() => {
    if (!adminInfo) {
       navigate('/');
    // props.onFormSwitch('login');
    }
}, [navigate, adminInfo]);

    // useEffect(() => {
    //     if (userInfo) {
    //        navigate('/signin');
    //     // props.onFormSwitch('login');
    //     }
    // }, [navigate, userInfo]);

    const refreshPage = () => {
        window.location.reload();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('name: ' + name, description, id, imageUp, link);
        dispatch(addProd(id, description, name, link, imageUp));
        confirmAlert({
            title: 'Product Added',
            message: name + ' with Product_ID ' + id + ' has been added!',
            buttons: [
                {
                    label: 'Ok',
                    onClick: () => { refreshPage() }
                },
            ]
        });

    }


    return (
        <div className="super-cont">
            <div className="add-prod-form">
                <div className="auth-form-container">
                    <Nav.Link as={Link} to={"/admin/products"}><img src={logo} className="App-logo-addProd" alt="logo " /></ Nav.Link>
                    {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                    {/* {message && <ErrorMessage variant="danger">{message}</ErrorMessage>} */}
                    {loading && <Loading />}
                    <form className="register-form" onSubmit={handleSubmit}>

                        <div className="id-label">
                            <MdFilter1 style={{ fontSize: '25px' }} />
                            <label htmlFor="id">Product ID</label></div>
                        <input
                            value={id}
                            //onChange={(e) => setID(e.target.value)}
                            name="id"
                            id="id"
                            placeholder="Product ID"
                            autoComplete="off"
                            required
                            //readOnly={true}
                            disabled={true}
                        />

                        <div className="name-label">
                            <MdOutlineSmartphone style={{ fontSize: '25px' }} />
                            <label htmlFor="name">Product Name</label></div>
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
                            <label htmlFor="description">Product Description</label></div>
                        <input
                            value={description}
                            onChange={(e) => setDesc(e.target.value)}
                            name="description"
                            id="description"
                            placeholder="Decsription"
                            autoComplete="off"
                            required
                        />

                        <div className="link-label">
                            <MdLink style={{ fontSize: '25px' }} />
                            <label htmlFor="link">Link</label></div>
                        <input
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            type="url"
                            placeholder="http://abc.com"
                            id="link"
                            name="link"
                            autoComplete="off"
                            required
                        />

                        {/* <div className="image-label">
                            <MdImage style={{ fontSize: '25px' }} />
                            <label htmlFor="image">Product Image URL</label></div>
                        <input
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            type="url"
                            placeholder="http://abc.jpg" 
                            id="iamge"
                            name="image"
                            required
                        /> */}

<h1>Upload Image</h1>
      <input
        type="file"
        name="file"
        placeholder="Upload an image"
        onChange={uploadImage}
      />
      {loadingUp ? (
        <h3>Loading...</h3>
      ) : (
        <img src={imageUp} style={{ width: '300px' }} />
      )}
    


                        <button className="add-prod" type="submit">Add Product</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProduct;