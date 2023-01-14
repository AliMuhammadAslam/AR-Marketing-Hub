import React, { useRef, useState, useContext, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import marketing from '../Images/marketing.jpg';
import './Home.css'
import { listHome } from "../actions/homeAction";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

function Home() {
    // const refreshPage = () => {
    //     window.location.reload();
    //     //navigate('/admin/products');
    // }

    // const [refresh, setRefresh] = useState(0);
    // if(refresh===0){
    //     setRefresh(refresh+1);
    //     console.log(refresh)
    //     refreshPage();
    // }
    // else{
    //     console.log(refresh)
    // }
    
    
    // window.location.reload();

//     const dispatch = useDispatch();

//     const homeList = useSelector((state) => state.homeList);
//   const { home } = homeList;

//   useEffect(() => {
//     dispatch(listHome());
//     console.log("what is home?");
//     //getAbout();
//     // if (!userInfo) {
//     //   navigate('/'); 
//     // }
//   }, [
//     dispatch,
//     // userInfo,
//   ]);

//   console.log(home);

    return <div>
        <div className="home-text" style={{fontFamily:'Futura-bold', fontSize:'25px'}}>
        <a><img src={marketing} className="mark" alt="marketing" /> </a><br /><br />
        <a>Hi there! We are pleased to welcome you on board with AR Marketing Hub! You joined thousands of brands who are already</a><br />
        <a> skyrocketing their sales with AR by: [Benefit 1] [Benefit 2] [Benefit 3] There are just a few tiny steps you need to</a><br />
        <a> take to achieve all these amazing things: [Step 1] [Step 2] [Step 3]</a>
        </div>
    </div>
}

export default Home;