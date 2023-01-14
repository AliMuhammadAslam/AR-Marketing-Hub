import React from "react";
import logo from '../Images/Iphone 14.jpg';
import './Products.css';
import { useRef, useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { listProducts } from "../actions/productAction";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from 'react-router-dom';
import axios from "../api/axios";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { adminLogout } from "../actions/userAction";
import logo2 from '../Images/AR-logo.png';
import './adminProduct.css';
function AdminProducts() {
    let navigate = useNavigate();
    const dispatch = useDispatch();

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

    // const userLogin = useSelector((state) => state.userLogin);
    // const { userInfo } = userLogin;
    

    useEffect(() => {
        dispatch(listProducts());
        //getAbout("why ???");
        // if (!userInfo) {
        //   navigate('/');
        // }
    }, [
        dispatch,
        //navigate,
       // userInfo,
    ]);

    const logoutHandler = () => {
        dispatch(adminLogout());
        navigate('/');
      };

    const refreshPage = ()=>{
        window.location.reload();
     }

    let deleteProd = async(Product_ID) => {
        try {
            await axios.get(`http://localhost:3500/auth/delete_product/${Product_ID}`).then((response) => {
             setPost(response.data);
           });
          //{about} = data; 
          console.log(post)
          confirmAlert({
            title: 'Product Deleted',
            message: 'Product with Product_ID '+Product_ID+' has been deleted!',
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

    // let updateProd = async(Product_ID) => {
    //     navigate
    // }

    //`/ticket/${event.Event_ID}`
 const [post, setPost] = useState('');

   


  return (
    <div>
    <div>
        <nav className="navbar navbar-default">

          <div className="container-fluid">

            <div className="navbar-header">
              
              <div className="navbar-brand"><Nav.Link as={Link} to={"/admin/"}><img src={logo2} className="App-icon" alt="logo" /></Nav.Link></div>
            </div>
            <ul className="nav navbar-nav">
            
            <Nav.Link as={Link} to={"/admin/addProduct"}><button className="add-prod">Add Product</button></Nav.Link>
            <button onClick ={() => { logoutHandler() }}>Logout</button>
            
          </ul>
          </div>
        </nav>
      </div>
    <div className="super-product-cont">
      
      {/* <Nav.Link as={Link} to={"/admin/"}><button className="admin-home">Home</button></Nav.Link> */}
      {/* <button onClick={() => { logoutHandler() }}>Logout</button> */}
      {console.log(products)}
      <div className="header"><h1>Products</h1></div>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {/* <Nav.Link as={Link} to={"/admin/addProduct"}><button className="add-prod">Add Product</button></Nav.Link> */}
      {/* <button className="add-prod">Add Product</button> */}
      {products && products.map(product => (
        <div className="product-container" key={product._id}>
          <a><img src={product.Image} className="product-pic" alt="pic" /> </a>
          <h1>{product.Product_Name}</h1>
          <a>{product.Description}</a><br />
          {/* <div className="buttonCon"> */}
          
          <div className="buttonCon">
          
          <a><button className="delete-prod"
            onClick={() => { deleteProd(product.Product_ID) }}
          //  onClick={deleteProd && this.deleteProd}
          // onClick={function(e) {
          //     this.deleteProd(product.Product_ID); //can pass arguments this.btnTapped(foo, bar);          
          //   }}
          >Delete Product</button></a>
          <a><Nav.Link as={Link} to={`/admin/updateProduct/${product.Product_ID}`}><button className="update-prod">Update Product</button></Nav.Link></a>
          </div>
          
          {/* </div> */}


          {/* <button className="update-prod" 
                        onClick ={() => { updateProd(product.Product_ID )}}
                        //  onClick={deleteProd && this.deleteProd}
                        // onClick={function(e) {
                        //     this.deleteProd(product.Product_ID); //can pass arguments this.btnTapped(foo, bar);          
                        //   }}
                          >Update Product</button> */}

        </div>
      ))}
    </div>
    </div>
  )
}

export default AdminProducts;