import React from 'react'
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa"
import "./style.scss"
import ContentWrapper from '../contentWrapper/ContentWrapper'


const Footer = () => {
    return (
        <footer className='footer'>
            <ContentWrapper>
                <ul className="menuItems">
                    <li className="menuItem">Terms of use</li>
                    <li className="menuItem">Privacy-Policy</li>
                    <li className="menuItem">About</li>
                    <li className="menuItem">Blog</li>
                    <li className="menuItem">FAQ</li>
                </ul>
                <div className="infoText">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                </div>
                <div className="socialIcons">
                    <a href="https://www.facebook.com/nopudirM/">
                        <span className='icon'>

                            <FaFacebookF />

                        </span>
                    </a>
                    <a href="https://www.instagram.com/_mriduku/">
                        <span className='icon'>

                            <FaInstagram />
                        </span>
                    </a>
                    <a href="*">
                        <span className="icon">
                            <FaTwitter />
                        </span>
                    </a>
                    <a href="https://www.linkedin.com/in/mridupon-kutum/">
                        <span className="icon">
                            <FaLinkedin />
                        </span>
                    </a>

                </div>
            </ContentWrapper>

        </footer>
    );
};

export default Footer