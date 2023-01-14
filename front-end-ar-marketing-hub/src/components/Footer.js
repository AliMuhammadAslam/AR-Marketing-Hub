import React,{useRef} from 'react'
// import styled from 'styled-components';
import './Footer.css';
import logo from '../Images/AR-logo.png';
// import logo from '../ARMHLogo.png';
import { MdFacebook } from 'react-icons/md';
import { FaInstagram, FaLinkedin, FaPinterest, FaTwitter, FaYoutube } from 'react-icons/fa';
// import emailjs from 'emailjs-com';
import emailjs from '@emailjs/browser';
import { Form } from 'react-bootstrap';




function Footer() {
    const form = useRef();
  
    const sendEmail = (e) => {

        e.preventDefault();

        emailjs.sendForm('service_jbmyhht', 'template_zhzhf4s', form.current, 'FNEB2PG8inA-lciwa')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
            // console.log(form.current)
            form.current.reset();

    }

    return (
        <div className="main-footer">
            <div className="footer-middle">
                <div className="container">
                    <div className="row">
                        {/* Column 1 */}
                        <div className="column-1 col-md-3 col-sm-6">
                            <img src={logo} className="App-icon" alt="logo"/>
                            <h4>Contact Us</h4>
                            <ul className='list-unstyled'>
                                <li>Email:</li>
                                <li><a className='email' href="mailto:rafaitariq@hotmail.com?cc=aaalimohd@gmail.com&subject=Mail from AR MArketing Hub">ARmarketinghub@email.com</a></li>
                                <li className='phone-heading'>Phone:</li>
                                <li className='phone'>+92 333 76589121</li>

                            </ul>

                        </div>
                        {/* Column 2 */}
                        <div className="column-2 col-md-3 col-sm-6">
                            <h4>Events</h4>
                            <ul className='list-unstyled'>
                                <li><a href="/">Concert</a></li>
                                <li><a href="/">Food Festival</a></li>
                                <li><a href="/">Seminar</a></li>
                                <li><a href="/">Conference</a></li>

                            </ul>

                        </div>
                        {/* Column 3 */}
                        <div className="column-3 col-md-3 col-sm-6">
                            <h4>Products</h4>
                            <ul className='list-unstyled'>
                                <li><a href="">Appliances</a></li>
                                <li><a href="">Gadgets</a></li>
                                <li><a href="">Automobiles</a></li>
                                <li><a href="">Clothing</a></li>

                            </ul>

                        </div>
                        {/* Column 4 */}
                        {/* <div className='vl'></div> */}
                        <div className="column-4 col-md-3 col-sm-6">
                        <div className='vl'></div>
                            <h4>Keep In Touch</h4>
                            <ul className='list-unstyled'>
                                <li >Subscribe to our Newletter</li>
                                {/* <form ref={form} onSubmit={sendEmail}>
                                    <div className='in'>
                                        <input className='form-control' type="email" placeholder="youremail@email.com" name = "reply"> </input>
                                    </div>
                                    <div className='bt'>
                                        <input className="subscribe-btn" type="submit" value='Subscribe'></input>
                                    </div>
                                </form> */
                                }
                                <form ref={form} onSubmit={sendEmail}>
                                    
                                    <label>Email</label>
                                    <input className= "emailBox" type="email" placeholder="youremail@email.com" name="reply" />
                                    {/* <input type="email" placeholder="youremail@email.com" name = "reply"> </input> */}
                                    {/* <input className="subscribe-btn" type="submit" value='Subscribe'></input> */}
                                    <button className="subButton" type="submit">Subscribe</button>
                                    {/* <input type="submit" value="Send" /> */}
                                </form>
                                <h4 className='sm-heading'>Join us on social media</h4>
                                <div className='logo-container'>
                                <a className='icon-FB'><MdFacebook/></a>
                                <a className='icon-Tw'><FaTwitter/></a>
                                <a className='icon-YT'><FaYoutube/></a>
                                <a className='icon-Ig'><FaInstagram/></a>
                                <a className='icon-Pi'><FaPinterest/></a>
                                <a className='icon-Li'><FaLinkedin/></a>
                                </div>
                            </ul>

                        </div>

                    </div>
                    {/* Footer Bottom */}
                    <div className="footer-bottom">
                        <br></br>
                        <p className="text-xs-center">
                            
                            &copy;{new Date().getFullYear()} AR Marketing Hub - All Rights Reserved


                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default Footer;
