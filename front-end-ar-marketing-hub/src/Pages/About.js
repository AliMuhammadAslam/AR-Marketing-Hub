import React, { useRef, useState, useContext, useEffect}  from "react";
import { useDispatch, useSelector } from "react-redux";
import marketing from '../Images/marketing.jpg';
import about1 from '../Images/about1.jpg';
import about2 from '../Images/about2.jpg';
import './About.css'
import { listAbout } from "../actions/aboutAction";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from 'react-router-dom';
import axios from "../api/axios";

//const ABOUT_LIST_URL = '/auth/about';

function About() {
    const dispatch = useDispatch();

  //  const userLogin = useSelector((state) => state.userLogin);
  //  const { userInfo } = userLogin;

  const aboutList = useSelector((state) => state.aboutList);
  const { loading, error, about } = aboutList;

  useEffect(() => {
    dispatch(listAbout());
    console.log("what is about?");
    //getAbout();
    // if (!userInfo) {
    //   navigate('/'); 
    // }
  }, [
    dispatch,
    // userInfo,
  ]);


  // const [post, setPost] = useState('');

    // let getAbout = async() => {
    //      await axios.get('http://localhost:3500/auth/about').then((response) => {
    //         setPost(response.data);
    //       });
    //       //{about} = data; 
    // }

    
    //   for(var i in post)
    //   result.push([i, post[i]]);
        
      console.log(about)
      //console.log(post)
      

    return <div>
        
        <div className="about-text" style={{ fontFamily: 'Futura-bold', fontSize: '25px' }}>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {/* {about && loading} */}
        <div className="header"><h1>{about && about.title}</h1></div>
            <div className="Container1">
                <a><img src={about && about.Image1} className="about1" alt="about1" /> </a>
                <a></a>{about && about.text1}<br />
                </div><br /><br />

            <div className="Container2">
            <a>{about && about.text2}</a>
            <a><img src={about && about.Image2} className="about2" alt="about2" /> </a><br />
            </div> 
        </div>
    </div>
}

export default About;