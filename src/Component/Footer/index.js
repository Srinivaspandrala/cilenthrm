import React from 'react';
import './index.css';
import { FaCopyright} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>Copyright <FaCopyright /> 2025 GTS All Rights Reserved | Privacy Policy</p>
            </div>
        </footer>
    );
};

export default Footer;