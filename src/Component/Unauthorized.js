import React from "react";
import { FaShieldHalved } from "react-icons/fa6";
import "./Unauthorized.css";

const Unauthorized = () => {

    return (
        <>
            <div className="unauthorized-container">
                <FaShieldHalved className="icon-shield" />
                <h1>Access Denied</h1>
                <p>You do not have permission to view this page.</p>
            </div>
        </>
    );
};

export default Unauthorized;
