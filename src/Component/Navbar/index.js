import React, { useEffect } from 'react';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaBell, FaEnvelope, FaCalendar, FaHome, FaCog, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import './index.css'; 
import { FaPowerOff } from 'react-icons/fa6';
import { jwtDecode } from 'jwt-decode';

const NavbarComponent = ({ isSidebarExpanded, isFullWidth }) => {
    const navigate = useNavigate();
    const username = Cookies.get('fullname'); 
    const token = Cookies.get('token');
    let userRole;

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            userRole = decodedToken.role;
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    }

    useEffect(() => {
        if (!token) {
            Cookies.remove('username');
            Cookies.remove('token');
            navigate('/');
        }
    }, [token, navigate]);

    const handleLogout = async () => {
        fetch('http://localhost:5000/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).catch(error => console.error('Error during logout:', error));

        Cookies.remove('token');
        Cookies.remove('username');
        navigate('/');
    };

    const handleProfile = () => {
        navigate('/profile');
    };

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
                    {userRole === 'Admin' ? (
                        <Nav.Link as={Link} to="/dashboard" className="nav-dashboard"><FaTachometerAlt size={20} /></Nav.Link>
                    ) : (
                        <Nav.Link as={Link} to="/home" className="nav-home"><FaHome size={20} /></Nav.Link>
                    )}
                    <Dropdown align="end">
                    <Dropdown.Toggle variant="light" id="dropdown-basic" className="dropdown-toggle-custom">
    <FontAwesomeIcon icon={faUserTie} className="nav-user" />
</Dropdown.Toggle>

                        <Dropdown.Menu className="dropdown-menu-custom">
                            <div className="dropdown-border"></div>
                            <Dropdown.Item className="dropdown-item-custom" onClick={handleProfile}>
                                <FaCog className="icon-navdrop"  /><span className='item'>My Profile</span> 
                            </Dropdown.Item>
                            <Dropdown.Item className="dropdown-item-custom" onClick={handleLogout}>
                                <FaPowerOff className="icon-navdrop" /> Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
