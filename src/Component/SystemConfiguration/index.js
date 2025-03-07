import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './index.css'; // Ensure proper styling is provided

const SystemConfiguration = () => {
    const [config, setConfig] = useState({
        emailUser: '',
        emailPass: '',
        jwtSecret: '',
        componentAccess: 'on',
        emailTemplates: {
            welcome: '',
            passwordReset: ''
        }
    });

    useEffect(() => {
        // Fetch existing configuration from the server
        const fetchConfig = async () => {
            const token = Cookies.get('token');
            if (!token) {
                alert('No JWT token found. Please log in.');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/config', {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const data = await response.json();
                if (response.ok) {
                    setConfig(data.config);
                } else {
                    alert('Error fetching configuration: ' + data.message);
                }
            } catch (error) {
                console.error('Error fetching configuration:', error);
                alert('There was an error fetching the configuration.');
            }
        };

        fetchConfig();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setConfig((prevConfig) => ({
            ...prevConfig,
            [name]: value
        }));
    };

    const handleEmailTemplateChange = (e) => {
        const { name, value } = e.target;
        setConfig((prevConfig) => ({
            ...prevConfig,
            emailTemplates: {
                ...prevConfig.emailTemplates,
                [name]: value
            }
        }));
    };

    const handleSaveConfig = async () => {
        const token = Cookies.get('token');
        if (!token) {
            alert('No JWT token found. Please log in.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/config', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(config)
            });

            const data = await response.json();
            if (response.ok) {
                alert('Configuration saved successfully!');
            } else {
                alert('Error saving configuration: ' + data.message);
            }
        } catch (error) {
            console.error('Error saving configuration:', error);
            alert('There was an error saving the configuration.');
        }
    };

    return (
        <div className="system-configuration">
            <h2>System Configuration</h2>
            <div className="form-grid">
                <div className="form-field">
                    <label>Email User</label>
                    <input
                        type="text"
                        name="emailUser"
                        value={config.emailUser}
                        onChange={handleInputChange}
                        className="styled-input"
                    />
                </div>
                <div className="form-field">
                    <label>Email Password</label>
                    <input
                        type="password"
                        name="emailPass"
                        value={config.emailPass}
                        onChange={handleInputChange}
                        className="styled-input"
                    />
                </div>
                <div className="form-field">
                    <label>JWT Secret</label>
                    <input
                        type="text"
                        name="jwtSecret"
                        value={config.jwtSecret}
                        onChange={handleInputChange}
                        className="styled-input"
                    />
                </div>
                <div className="form-field">
                    <label>Component Access</label>
                    <select
                        name="componentAccess"
                        value={config.componentAccess}
                        onChange={handleInputChange}
                        className="styled-select"
                    >
                        <option value="on">On</option>
                        <option value="off">Off</option>
                    </select>
                </div>
                <div className="form-field">
                    <label>Welcome Email Template</label>
                    <textarea
                        name="welcome"
                        value={config.emailTemplates.welcome}
                        onChange={handleEmailTemplateChange}
                        className="styled-textarea"
                    />
                </div>
                <div className="form-field">
                    <label>Password Reset Email Template</label>
                    <textarea
                        name="passwordReset"
                        value={config.emailTemplates.passwordReset}
                        onChange={handleEmailTemplateChange}
                        className="styled-textarea"
                    />
                </div>
            </div>
            <div className="form-buttons">
                <button className="save-config-btn" onClick={handleSaveConfig}>
                    Save Configuration
                </button>
            </div>
        </div>
    );
};

export default SystemConfiguration;
