import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './AddEmployee.css';

const EmployeeEdit = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [formData, setFormData] = useState({
        basicDetails: { email: "", phone: "", dateOfBirth: "", gender: "" },
        address: { street: "", city: "", state: "", zipcode: "", country: "" },
        employment: { company: "", department: "", position: "", startDate: "" },
    });
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [fullName, setFullName] = useState("");
    const [activeTab, setActiveTab] = useState(0);
    const [status, setStatus] = useState("Active");
    const [statusDate, setStatusDate] = useState("");

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
                    setFormData({
                        basicDetails: {
                            email: data.data.WorkEmail,
                            phone: data.data.phone,
                            dateOfBirth: data.data.DateOfBirth,
                            gender: data.data.Gender
                        },
                        address: {
                            street: data.data.Address,
                            city: data.data.City,
                            state: data.data.State,
                            zipcode: data.data.PinCode,
                            country: data.data.Country
                        },
                        employment: {
                            company: data.data.Company,
                            department: data.data.Role,
                            position: data.data.designation,
                            startDate: data.data.startdate
                        }
                    });
                    setFirstName(data.data.FirstName);
                    setLastName(data.data.LastName);
                    setFullName(data.data.FullName);
                } else {
                    console.error('Error fetching employee:', response.status);
                }
            } catch (error) {
                console.error('Error fetching employee:', error);
            }
        };

        fetchEmployee();
    }, [id]);

    const handleInputChange = (section, field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [section]: { ...prevData[section], [field]: value },
        }));
    };

    const handleFileChange = (section, field, file) => {
        setFormData((prevData) => ({
            ...prevData,
            [section]: { ...prevData[section], [field]: file },
        }));
    };

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
        setFullName(`${e.target.value} ${lastName}`);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
        setFullName(`${firstName} ${e.target.value}`);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        if (["On Hold", "Suspended", "Resigned"].includes(e.target.value)) {
            setStatusDate(new Date().toISOString().split("T")[0]);
        } else {
            setStatusDate("");
        }
    };

    const handleStatusDateChange = (e) => {
        setStatusDate(e.target.value);
    };

    const nextStep = () => {
        setActiveTab((prev) => Math.min(prev + 1, 3));
    };

    const prevStep = () => {
        setActiveTab((prev) => Math.max(prev - 1, 0));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:5000/employee/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    FullName: fullName,
                    FirstName: firstName,
                    LastName: lastName,
                    Status: status,
                    StatusDate: statusDate
                })
            });
            if (response.ok) {
                navigate(`/employee/${id}`);
            } else {
                console.error('Error updating employee:', response.status);
            }
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    const getPositions = (department) => {
        switch (department) {
          case "Manager":
            return ["HR Manager", "Project Manager"];
          case "Employee":
            return ["Frontend Developer", "Backend Developer"];
          case "Intern":
            return ["Frontend Intern", "Backend Intern"];
          default:
            return [];
        }
      };
    

    return (
        <div className="form-container">
            <h1>Edit Employee</h1>
            <div className="tabs">
                {["Basic Details", "Address", "Employment", "Documents"].map((tab, index) => (
                    <div key={index} className={`tab ${activeTab === index ? "active-addemployee" : ""}`} onClick={() => setActiveTab(index)}>
                        <i className={["fas fa-user", "fas fa-map-marker-alt", "fas fa-briefcase", "fas fa-file-alt"][index]}></i> {tab}
                    </div>
                ))}
            </div>

            {/* Form Sections */}
            <div className="form-card">
                {/* Basic Details */}
                {activeTab === 0 && (
                    <div className="section active-addemployee">
                        <div className="input-group" style={{backgroundColor:"#f5f5f5"}}>
                            <i className="fas fa-id-badge"></i>
                            <input type="text" placeholder="Employee ID" value={id} readOnly  />
                        </div>
                        <div className="input-group">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="First Name" value={firstName} onChange={handleFirstNameChange} required />
                        </div>
                        <div className="input-group">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Last Name" value={lastName} onChange={handleLastNameChange} required />
                        </div>
                        <div className="input-group">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Full Name" value={fullName} readOnly />
                        </div>
                        <div className="input-group">
                            <i className="fas fa-envelope"></i>
                            <input type="email" placeholder="Email" value={formData.basicDetails.email} onChange={(e) => handleInputChange("basicDetails", "email", e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <i className="fas fa-phone"></i>
                            <input type="tel" placeholder="Phone Number" value={formData.basicDetails.phone} onChange={(e) => handleInputChange("basicDetails", "phone", e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <i className="fas fa-calendar-alt"></i>
                            <input type="date" placeholder="Date of Birth" value={formData.basicDetails.dateOfBirth} onChange={(e) => handleInputChange("basicDetails", "dateOfBirth", e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <i className="fas fa-venus-mars"></i>
                            <select value={formData.basicDetails.gender} onChange={(e) => handleInputChange("basicDetails", "gender", e.target.value)} required>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                )}

                {/* Address */}
                {activeTab === 1 && (
                    <div className="section active-addemployee">
                        <div className="input-group">
                            <i className="fas fa-road"></i>
                            <input type="text" placeholder="Street Address" value={formData.address.street} onChange={(e) => handleInputChange("address", "street", e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <i className="fas fa-city"></i>
                            <input type="text" placeholder="City" value={formData.address.city} onChange={(e) => handleInputChange("address", "city", e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <i className="fas fa-map"></i>
                            <input type="text" placeholder="State" value={formData.address.state} onChange={(e) => handleInputChange("address", "state", e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <i className="fas fa-map-pin"></i>
                            <input type="text" placeholder="Zip Code" value={formData.address.zipcode} onChange={(e) => handleInputChange("address", "zipcode", e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <i className="fas fa-globe"></i>
                            <select value={formData.address.country} onChange={(e) => handleInputChange("address", "country", e.target.value)} required>
                                <option value="">Select Country</option>
                                <option value="India">India</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                )}

                {/* Employment */}
                {activeTab === 2 && (
                    <div className="section active-addemployee">
                        <div className="input-group">
                            <i className="fas fa-building"></i>
                            <select value={formData.employment.company} onChange={(e) => handleInputChange("employment", "company", e.target.value)} required>
                                <option value="">Select Company</option>
                                <option value="GTS">GTS</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <i className="fas fa-user-tie"></i>
                            <select value={formData.employment.department} onChange={(e) => handleInputChange("employment", "department", e.target.value)} required>
                                <option value="">Select Department</option>
                                <option value="Manager">Manager</option>
                                <option value="Employee">Employee</option>
                                <option value="Intern">Intern</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <i className="fas fa-briefcase"></i>
                            <select value={formData.employment.position} onChange={(e) => handleInputChange("employment", "position", e.target.value)} required>
                                <option value="">Select Position</option>
                                {getPositions(formData.employment.department).map((position) => (
                                    <option key={position} value={position}>{position}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <i className="fas fa-calendar-alt"></i>
                            <input type="date" value={formData.employment.startDate} style={{color:"green",fontWeight:"bold"}} onChange={(e) => handleInputChange("employment", "startDate", e.target.value)} required/>
                            <span style={{fontWeight:"bold"}}>Start Date</span>
                        </div>
                        <div className="input-group">
                        <i class="fa fa-user-plus"></i>
                        <select value={status} onChange={handleStatusChange} style={{fontWeight:"bold"}} required>
                                <option value="Active">Active</option>
                                <option value="On Hold">On Hold</option>
                                <option value="Suspended">Suspended</option>
                                <option value="Resigned">Resigned</option>
                            </select>
                        </div>
                        {["On Hold", "Suspended", "Resigned"].includes(status) && (
                            <div className="input-group">
                                <i className="fas fa-calendar-alt"></i>
                                <input type="date" value={statusDate} onChange={handleStatusDateChange} required />
                            </div>
                        )}
                    </div>
                )}

                {/* Documents */}
                {activeTab === 3 && (
                    <div className="section active-addemployee">
                        <div className="input-group">
                            <input type="file" onChange={(e) => handleFileChange("documents", "resume", e.target.files[0])} />
                            <i className="fas fa-file-pdf"></i>
                            <span style={{fontWeight:"bold"}}>Photo Id</span>
                        </div>
                        <div className="input-group">
                            <input type="file" onChange={(e) => handleFileChange("documents", "idProof", e.target.files[0])} />
                            <i className="fas fa-id-card"></i>
                            <span style={{fontWeight:"bold"}}>Other Documents</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="button-container">
                {activeTab > 0 && (
                    <button className="back" onClick={prevStep}>
                        <i className="fas fa-arrow-left"></i> Back
                    </button>
                )}
                {activeTab < 3 ? (
                    <button className="next" onClick={nextStep}>
                        Next <i className="fas fa-arrow-right"></i>
                    </button>
                ) : (
                    <button className="submit" onClick={handleSubmit}>
                        <i className="fas fa-paper-plane"></i> Save
                    </button>
                )}
            </div>
        </div>
    );
};

export default EmployeeEdit;
