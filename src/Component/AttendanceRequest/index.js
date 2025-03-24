import React, { useState, useEffect } from "react";
import { useTheme } from '../../context/ThemeContext';

import "./index.css";

const AttendanceRequest = () => {
  const [availableDates, setAvailableDates] = useState([]); 
  const [selectedDate, setSelectedDate] = useState(""); 
  const [error, setError] = useState(null);
  const { slide } = useTheme();

  useEffect(() => {
    const fetchAttendanceData = async () => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      try {
        const response = await fetch("http://localhost:5000/request", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch attendance data");
        }

        const data = await response.json();

        const dates =
          Array.isArray(data.attendancerquest) && data.attendancerquest.length > 0
            ? data.attendancerquest
                .filter((item) => item.Logstatus === "No")
                .map((item) => item.Logdate)
            : [];

        setAvailableDates(dates);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAttendanceData();
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    console.log("Selected Date:", event.target.value);
  };

  return (
    <div className={slide === "false" ?  "attendancereq-container" : "attendancereq-container1"}>
      <h1 className="heading-bg-req">Attendance Request</h1>
      {error && <p className="error">{error}</p>}

      <form>
        <label htmlFor="date-dropdown">Select a Date</label>
        <select
          id="date-dropdown"
          value={selectedDate}
          onChange={handleDateChange}
        >
          <option value="" disabled>
            -- Select a Date --
          </option>
          {availableDates.map((date, index) => (
            <option key={index} value={date}>
              {date}
            </option>
          ))}
        </select>

        <label htmlFor="reason">Reason/Description</label>
        <textarea
          id="reason"
          placeholder="Enter the reason or description here..."
        ></textarea>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default AttendanceRequest;
