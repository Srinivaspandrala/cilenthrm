import { useState } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const LeaveForm = () => {
  const [FromDate, setFromDate] = useState("");
  const [ToDate, setToDate] = useState("");
  const [FromTime, setFromTime] = useState("");
  const [ToTime, setToTime] = useState("");
  const [LeaveType, setLeaveType] = useState("");
  const [Reason, setReason] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();

  const leaveDropdownsoption = () =>{
    switch(location.pathname){
      case "/casualleave":
        return ['Select Leave type','casual Leave'];
      case "/paidleave":
        return ['Select Leave type','paid leave'];
      case '/unpaidleave':
        return ['Select Leave type','unpaid leave']
      default:
        return['No leave option with this path']
    }
  }

  const option = leaveDropdownsoption();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date();
    const selectedDate = new Date(FromDate);
    const difference = Math.ceil(
      (selectedDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
    );

    if (difference < 10) {
      setError("You can apply for leave only 10 days in advance.");
      return;
    }
    const leaveDetails = {
      FromDate,
      ToDate,
      FromTime,
      ToTime,
      LeaveType,
      Reason,
    };
    const leaveDetailsString = JSON.stringify(leaveDetails, null, 2);
    const url = "http://localhost:5000/apply";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token"),
      },
      body: leaveDetailsString,
    };

    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
      setError(data.message);
      return;
    }
    

    alert("Leave Applied Successfully");
    setError("");
    setFromDate("");
    setToDate("");
    setFromTime("");
    setToTime("");
    setLeaveType("");
    setReason("");
    
  };

  return (
    <div className="leave-form-container">
      <h2 className="tll">Apply for Leave</h2>
      <p className="pp1">
        NOTE: <span>Leave Can be Applied 10 Days in Advance</span>
      </p>
      <form onSubmit={handleSubmit}>
        <div className="date-time-container">
          <div className="date-time-column">
            <label>From Date</label>
            <input
              type="date"
              value={FromDate}
              min={new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
              onChange={(e) => setFromDate(e.target.value)}
              required
            />
          </div>
          <div className="date-time-column">
            <label>To Date</label>
            <input
              type="date"
              value={ToDate}
              min={FromDate || undefined}
              onChange={(e) => setToDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="date-time-container">
          <div className="date-time-column">
            <label>From Time</label>
            <input
              type="time"
              value={FromTime}
              onChange={(e) => setFromTime(e.target.value)}
              required
            />
          </div>
          <div className="date-time-column">
            <label>To Time</label>
            <input
              type="time"
              value={ToTime}
              onChange={(e) => setToTime(e.target.value)}
              required
            />
          </div>
        </div>

        <label>Leave Type</label>
        <select className="dropdown">
        {option.map((option, index) => (
          <option key={index} value={option}>
            {option} 
          </option>
        ))}
       
      </select>

        <label>Reason</label>
        <textarea
          value={Reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />

        <button type="submit" className="submit-btn">
          Submit
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default LeaveForm;