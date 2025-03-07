import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext"; // ✅ Import ThemeProvider
import CalendarComponent from "./Component/Calendar";
import AttendancePage from "./Component/Attendance";
import LeaveForm from "./Component/Leave";
import Sidebar from "./Component/Sidebar";
import NavbarComponent from "./Component/Navbar";
import Home from "./Component/Home";
import LoginForm from "./Component/LoginForm";
import RegisterForm from "./Component/RegisterForm";
import Footer from "./Component/Footer";
import ForgotPassword from "./Component/ForgotPassword";
import Notification from "./Component/Notification";
import AttendanceRequest from "./Component/AttendanceRequest";
import AdvancedEmailForm from "./Component/Emali/inboxindex";
import ProtectedRoute from "./Component/ProtectedRoute";
import EmployeePage from "./Component/Empolyeedetalis";
import Dashboard from "./Component/Dashboard";
import ListEmployee from "./Component/EmployeeMangement/ListEmployee";
import AddEmployee from "./Component/EmployeeMangement/AddEmployee";
import EmployeeOverview from "./Component/EmployeeMangement/EmployeeOverview";
import SystemConfiguration from "./Component/SystemConfiguration";
import AdminAttendenceReqp from "./Component/AttendanceMangement/Attendancerequests";
import AttendanceMarking from "./Component/AttendanceMangement/AttendanceMarking";
import Unauthorized from "./Component/Unauthorized"; // ✅ Import Unauthorized component
import EmployeeEdit from "./Component/EmployeeMangement/EmployeeEdit";

const App = () => {
    return (
            <ThemeProvider> {/* ✅ Wrap inside ThemeProvider */}
                <Router>
                    <div>
                        <Routes>
                            <Route path="/" element={<LoginForm />} />
                            <Route path="/register" element={<RegisterForm />} />
                            <Route path="/forgotpassword" element={<ForgotPassword />} />
                            <Route path="/home" element={<ProtectedRoute role="Employee"><Sidebar /><NavbarComponent /><Home /></ProtectedRoute>} />
                            <Route path="/calendar" element={<ProtectedRoute role="Employee"><Sidebar /><NavbarComponent /><CalendarComponent /></ProtectedRoute>} />
                            <Route path="/paidleave" element={<ProtectedRoute role="Employee"><Sidebar /><NavbarComponent /><LeaveForm /></ProtectedRoute>} />
                            <Route path="/unpaidleave" element={<ProtectedRoute role="Employee"><Sidebar /><NavbarComponent /><LeaveForm /></ProtectedRoute>} />
                            <Route path="/casualleave" element={<ProtectedRoute role="Employee"><Sidebar /><NavbarComponent /><LeaveForm /></ProtectedRoute>} />
                            <Route path="/attendancelogs" element={<ProtectedRoute role="Employee"><Sidebar /><NavbarComponent /><AttendancePage /></ProtectedRoute>} />
                            <Route path="/notification" element={<ProtectedRoute role="Employee"><Sidebar /><NavbarComponent /><Notification /></ProtectedRoute>} />
                            <Route path="/attendancerequest" element={<ProtectedRoute role="Employee"><Sidebar /><NavbarComponent /><AttendanceRequest /></ProtectedRoute>} />
                            <Route path="/emali" element={<ProtectedRoute role="Employee"><Sidebar /><NavbarComponent /><AdvancedEmailForm /></ProtectedRoute>} />
                            <Route path="/profile" element={<ProtectedRoute role="Employee"><EmployeePage /></ProtectedRoute>} />
                            <Route path="/profile" element={<ProtectedRoute role="Admin"><EmployeePage /></ProtectedRoute>} />
                            <Route path="/dashboard" element={<ProtectedRoute role="Admin"><Sidebar /><NavbarComponent /><Dashboard /></ProtectedRoute>} />
                            <Route path="/manageemployee" element={<ProtectedRoute role="Admin"><Sidebar /><NavbarComponent /><ListEmployee /></ProtectedRoute>} />
                            <Route path="/addemployee" element={<ProtectedRoute role="Admin"><Sidebar /><NavbarComponent /><AddEmployee /></ProtectedRoute>} />
                            <Route path="/systemconfiguration" element={<ProtectedRoute role="Admin"><Sidebar /><NavbarComponent /><SystemConfiguration /></ProtectedRoute>} />
                            <Route path="/overviewemployee/:id" element={<ProtectedRoute role="Admin"><Sidebar /><NavbarComponent /><EmployeeOverview /></ProtectedRoute>} />
                            <Route path="/employeeattendancerequest" element={<ProtectedRoute role="Admin"><Sidebar /><NavbarComponent /><AdminAttendenceReqp /></ProtectedRoute>} />
                            <Route path="/attendancemarking" element={<ProtectedRoute role="Admin"><Sidebar/><NavbarComponent/><AttendanceMarking/></ProtectedRoute>}/>
                            <Route path="/employee/edit/:id" element={<ProtectedRoute role="Admin"><Sidebar/><NavbarComponent/><EmployeeEdit/></ProtectedRoute>} />
                            <Route path="/unauthorized" element={<><Unauthorized /></>} />
                            </Routes>
                        <Footer />
                    </div>
                </Router>
            </ThemeProvider>
    );
};

export default App;
