import React, { useEffect } from 'react';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaBell, FaEnvelope, FaCalendar, FaHome, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import './index.css'; // Add separate CSS for Navbar

const NavbarComponent = ({ isSidebarExpanded, isFullWidth }) => {
    const navigate = useNavigate();
    const username = Cookies.get('fullname'); 
    const token = Cookies.get('token');

    useEffect(() => {
        if (!token) {
            Cookies.remove('username');
            Cookies.remove('token');
            navigate('/');
        }
    }, [token, navigate]);

    const handleLogout = async () => {
        // Call the logout API
        fetch('http://localhost:5000/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).catch(error => console.error('Error during logout:', error));

        // Clear cookies and navigate to the home page
        Cookies.remove('token');
        Cookies.remove('username');
        navigate('/');
    };

    const handleprofile = () =>{
        navigate('/profile')
    }

    return (
        <Navbar variant="light" expand="lg" className={`nv ${isFullWidth ? 'fullWidth' : isSidebarExpanded ? 'expanded' : 'collapsed'}`}>
            <Container fluid className="d-flex justify-content-between align-items-center">
                <Nav className="d-flex align-items-center">
                    <Nav.Link href="#" className="nav-bell"><FaBell size={20} /></Nav.Link>
                    <Nav.Link as={Link} to="/email" className="nav-envelope"><FaEnvelope size={20} /></Nav.Link>
                </Nav>

                <Nav className="d-flex justify-content-center flex-grow-1">
                    <form className="d-flex w-75">
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                    </form>
                </Nav>

                <Nav className="d-flex align-items-center">
                    <Nav.Link className="name">{username || 'User'}</Nav.Link>
                    <Nav.Link as={Link} to="/calendar" className="nav-calendar"><FaCalendar size={20} /></Nav.Link>
                    <Nav.Link as={Link} to="/home" className="nav-home"><FaHome size={20} /></Nav.Link>
                    <Dropdown align="end">
                        <Dropdown.Toggle variant="light" id="dropdown-basic" style={{ backgroundColor: "#fff", fontWeight: "600", border: "none",color:"#34495e" }} >
                            <FontAwesomeIcon icon={faUserTie} className="nav-user" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleprofile}><FaCog /> Profile</Dropdown.Item>
                            <Dropdown.Item onClick={handleLogout}><FaSignOutAlt /> Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
