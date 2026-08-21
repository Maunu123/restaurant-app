    import React from "react";
    import "./Footer.css";

    import { assets } from "../../assets/assets";

    const footer = () => {
    return (
        <div className="footer" id="footer">
        <div className="footer-content">
            <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>
                lorem ipsum is simply dummy text of the printing and typesetting
                industry
            </p>
            <div className="footer-social-icon">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
            </div>
            <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
            </div>
            <div className="footer-content-left">
            <h2>GET IN TOUCH</h2>

            <ul>
                <li>+1-345-657-4353</li>
                <li>contact@tomato.com</li>
            </ul>
            </div>
        </div>
        <hr />

        <p className="footer-copyright">
            Copyright 2026 @ tomato.com - All right reserved
        </p>
        </div>
    );
    };

    export default footer;
