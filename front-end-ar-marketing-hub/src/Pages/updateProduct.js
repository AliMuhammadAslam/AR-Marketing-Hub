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
import { MdLink, MdImage, MdDescription, MdFilter1, MdOutlineSmartphone } from "react-icons/md";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from "../api/axios";

function UpdateProduct() {
    // const [id, setID] = useState('');
    

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const adminLogin = useSelector((state) => state.adminLogin);
    const { adminInfo } = adminLogin;

  useEffect(() => {
    if (!adminInfo) {
       navigate('/');
    // props.onFormSwitch('login');
    }
}, [navigate, adminInfo]);

     useEffect(() => {
         
        dispatch(listProducts());
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

    let { product_id } = useParams();
    product_id = parseInt(product_id, 10);
    //console.log(params);
    const [id, setID] = useState(product_id);
    // const [description, setDesc] = useState('');
    // const [name, setName] = useState('');
    // const [link, setLink] = useState('');
    // const [image, setImage] = useState('');
    
      

    var filtered = [];
    filtered = products?.find((product) => {
        return product.Product_ID === id;
      });
      //const myArray = Object.values(filtered);

      const [description, setDesc] = useState(filtered?.Description);
      const [name, setName] = useState(filtered?.Product_Name);
      const [link, setLink] = useState(filtered?.Link);
      const [image, setImage] = useState(filtered?.Image);

    //   if (products){
    //   setDesc(filtered.Description);
    // setName(filtered.Product_Name);
    // setLink(filtered.Link);
    // setImage(filtered.Image);
    //   };
    
    //products.Product_ID==3
    //const [id, setID] = useState(''));
    console.log("Product_ID: "+id+", Filtered Product: "+filtered);

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
    console.log('Submitted values: ' + id, name, description, image, link);
    dispatch(updateProd(product_id, id, name, description, link, image));
    // setDesc('');
    //          setID('');
    //          setImage('');
    //          setLink('');
    //          setName('');
    confirmAlert({
                    title: 'Product Updated',
                    message: 'Product with Product_ID ' + id + ' has been updated!',
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
                    <Nav.Link as={Link} to={"/admin/products"}><img src={logo} className="App-logo-addProd" alt="logo " /></ Nav.Link>
                    {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                    {/* {message && <ErrorMessage variant="danger">{message}</ErrorMessage>} */}
                    {loading && <Loading />}
                    {/* { products && products.filter(product => product.Prouct_ID === product_id).map(filteredProd => ( */}
                    {products &&
                    <form className="register-form" onSubmit={handleSubmit}>

                        <div className="id-label">
                            <MdFilter1 style={{ fontSize: '25px' }} />
                            <label htmlFor="id">Product ID</label></div>
                        <input
                            value={id}
                            //defaultValue={products[Product_ID-1].Product_ID}
                            onChange={(e) => setID(e.target.value)}
                            name="id"
                            id="id"
                            placeholder="Product ID"
                            autoComplete="off"
                            required
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

                        <div className="image-label">
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
                        />

                        <button className="add-prod" type="submit">Update Product</button>
                    </form>
                    }
                    {/* ))} */}
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct;