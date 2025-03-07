import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaUser, FaEnvelope, FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaUserEdit, FaBuilding, FaClipboard, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './EmployeeOverview.css';
import { FaAlignLeft, FaArrowLeft, FaChartLine, FaCircleCheck, FaFile, FaMoneyBill } from 'react-icons/fa6';

const EmployeeOverview = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [activeTab, setActiveTab] = useState('basic');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const token = Cookies.get('token');
                const response = await fetch(`http://localhost:5000/employee/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setEmployee(data.data);
                } else {
                    console.error('Error fetching employee:', response.status);
                }
            } catch (error) {
                console.error('Error fetching employee:', error);
            }
        };

        fetchEmployee();
    }, [id]);

    return (
        <div className="employee-overview-container">
            
            {/* Profile Card */}
            {employee && (
                <div className="profile-card">
                    <div>
            <button className="action-button-back" onClick={() => navigate('/manageemployee')}><FaArrowLeft/> Back</button>
            </div>
                    <div className="profile-avatar">
                        <FaUser  className="profile-icon" />
                    </div>
                    <h3 className="profile-name">{employee.FullName} <span className='active-icon'><FaCircleCheck/></span></h3>
                    <p className="profile-email"><FaEnvelope /> {employee.WorkEmail}</p>
                    <p className="profile-role"><FaBriefcase /> {employee.Role}</p>
                    <p className="profile-company"><FaCalendarAlt /> {employee.Company}</p>
                    <p className="profile-location"><FaMapMarkerAlt /> {employee.City}, {employee.State}</p>
                    <div className="button-container">
                        <button className="action-button edit-button" onClick={() => navigate(`/employee/edit/${id}`)}><FaUserEdit /> Edit</button>
                    </div>
                </div>
            )}

            {/* Tab Section */}
            <div className="tabs-container">
                <div className="tab-buttons">
                    <button className={`tab-button ${activeTab === 'basic' ? 'active' : ''}`} onClick={() => setActiveTab('basic')}><FaUser/> Basic Details</button>
                    <button className={`tab-button ${activeTab === 'address' ? 'active' : ''}`} onClick={() => setActiveTab('address')}><FaBuilding/> Address</button>
                    <button className={`tab-button ${activeTab === 'attendance' ? 'active' : ''}`} onClick={() => setActiveTab('attendance')}><FaClipboard/> Attendance</button>
                    <button className={`tab-button ${activeTab === 'documents' ? 'active' : ''}`} onClick={() => setActiveTab('documents')}><FaFile/> Documents</button>
                    <button className={`tab-button ${activeTab === 'salary' ? 'active' : ''}`} onClick={() => setActiveTab('Salary')}><FaMoneyBill/> Salary</button>
                    <button className={`tab-button ${activeTab === 'performance' ? 'active' : ''}`} onClick={() => setActiveTab('performance')}><FaChartLine/> Performance</button>
                </div>

                <div className="tab-content">
                    {activeTab === 'basic' && employee && (
                        <div className="details-card">
                            <p><strong>Employee ID:</strong> {employee.EmployeeID}</p>
                            <p><strong>Designation:</strong> {employee.designation}</p>
                            <p><strong>Date of Birth:</strong> {employee.DateOfBirth}</p>
                            <p><strong>Start Date:</strong> {employee.startdate}</p>
                            <p><strong>Status:</strong>                             <p className={employee.status === "Active" ? "active-icon" : "inactive-status"}>
                                                            {employee.status === "Active" ? (
                                                                <>
                                                                   <FaCheckCircle style={{ color: "#3ac43a", marginRight: "5px" }} />Active
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <FaTimesCircle style={{ color: "red", marginRight: "5px" }} />
                                                                    Inactive
                                                                </>
                                                            )}
                                                        </p></p>
                        </div>
                    )}

                    {activeTab === 'address' && employee && (
                        <div className="details-card">
                            <p><strong>Address:</strong> {employee.Address}</p>
                            <p><strong>City:</strong> {employee.City}</p>
                            <p><strong>State:</strong> {employee.State}</p>
                            <p><strong>Country:</strong> {employee.Country}</p>
                            <p><strong>Postal Code:</strong> {employee.PinCode}</p>
                        </div>
                    )}

                    {activeTab === 'attendance' && (
                        <div className="details-card">
                            <p><strong>Date:</strong> 2024-02-28</p>
                            <p><strong>Log Time:</strong> 09:00 AM</p>
                            <p><strong>Effective Hours:</strong> 9 Hours</p>
                            <p><strong>Status:</strong> Present</p>
                            <p><strong>Last log</strong>11:30pm</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployeeOverview;
