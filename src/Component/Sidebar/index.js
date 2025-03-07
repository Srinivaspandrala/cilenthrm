import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import {
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import {
  FaUser,
  FaCalendarCheck,
  FaBuilding,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import { FaGears, FaCoins, FaClipboard } from "react-icons/fa6";
import { useTheme } from "../../context/ThemeContext"; // ✅ Import Theme Context
import "./index.css"; // Ensure proper styling is provided

const Sidebar = ({ onToggle = () => {} }) => {
  const { toggleTheme } = useTheme(); // ✅ Use theme context

  const [expandedSections, setExpandedSections] = useState({});
  const [isExpanded, setIsExpanded] = useState(true);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();
  const username = Cookies.get("fullname");
  const designation = Cookies.get("designation") // Fetch username from cookies if stored

  useEffect(() => {
    const token = Cookies.get("token"); // Assuming token is stored in cookies
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.role);
    }
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleSection = (section) => {

    setExpandedSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleToggleSidebar = () => {
    toggleTheme();
    setIsExpanded(!isExpanded);
    onToggle(!isExpanded);
  };

  const menuItems = [
    {
      title: "Attendance",
      icon: <FaClipboard />,
      section: "attendance",
      role: "Employee",
      subItems: [
        { label: "Attendance Logs", path: "/attendancelogs" },
        { label: "Attendance Requests", path: "/attendancerequest" },
        { label: "Timings", path: "/timings" },
      ],
    },
    {
      title: "Leave",
      icon: <FaCalendarCheck />,
      section: "leave",
      role: "Employee",
      subItems: [
        { label: "Casual Leave", path: "/casualleave" },
        { label: "Paid Leave", path: "/paidleave" },
        { label: "Unpaid Leave", path: "/unpaidleave" },
      ],
    },
    {
      title: "Finances",
      icon: <FaCoins />,
      section: "finances",
      role: "Employee",
      subItems: [
        { label: "Summary", path: "/financesummary" },
        { label: "Salary Slip", path: "/salaryslip" },
      ],
    },
    {
      title: "Organisation",
      icon: <FaBuilding />,
      section: "organisation",
      role: "Employee",
      subItems: [
        { label: "Documents", path: "/documents" },
        { label: "Employees", path: "/employees" },
      ],
    },
    {
      title: "Employee",
      icon: <FaUser />,
      section: "Employee Management",
      role: "Admin",
      subItems: [
        { label: "Add Employee", path: "/addemployee" },
        { label: "Manage Employee", path: "/manageemployee" },
      ],
    },
    {
      title: "Attendance",
      icon: <FaClipboard />,
      section: "Attendance Management",
      role: "Admin",
      subItems: [
        { label: "Attendance Logs", path: "/attendancelogs" },
        { label: "Attendance Requests", path: "/employeeattendancerequest" },
        { label: "Mark Attendance", path: "/attendancemarking" },
      ],
    },
    {
      title: "Leave",
      icon: <FaCalendarCheck />,
      section: "Leave Management",
      role: "Admin",
      subItems: [
        { label: "Leave Request", path: "/Leavrequest" },
        { label: "Leave Approval", path: "/leaveapproval" },
      ],
    },
    {
      title: "Finances",
      icon: <FaCoins />,
      section: "Finances",
      role: "Admin",
      subItems: [{ label: "Salary Slip", path: "/salaryslip" }],
    },
    {
      title: "Setting",
      icon: <FaGears />,
      section: "Setting",
      role: "Admin",
      subItems: [{ label: "System Configuration", path: "/systemconfiguration" }],
    },
  ];

  return (
    <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="toggle-icon" onClick={handleToggleSidebar}>
        {isExpanded ? <MdOutlineKeyboardDoubleArrowLeft size={29} /> : <MdKeyboardDoubleArrowRight size={29} />}
      </div>

      <div className="user-section">
        <FaUser className="user-logo" />
        {isExpanded && <h4 className="username">{username || "User"}</h4>}
      </div>
      {isExpanded && <p className="user-role">{designation}</p>}

      {menuItems
        .filter((item) => item.role === userRole)
        .map((item, index) => (
          <div key={index} className="menu-section">
            <div className="sidebar-item" onClick={() => toggleSection(item.section)}>
              {item.icon}
              {isExpanded && <span>{item.title}</span>}
              {expandedSections[item.section] ? <FaChevronUp className="dropdown-icon" /> : <FaChevronDown className="dropdown-icon" />}
            </div>
            {expandedSections[item.section] && isExpanded && (
              <ul className="dropdown-content">
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex} className="sidebar-subitem" onClick={() => handleNavigation(subItem.path)}>
                    {subItem.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
    </div>
  );
};

export default Sidebar;
