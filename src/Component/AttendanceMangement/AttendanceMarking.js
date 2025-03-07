import React, { useState } from "react";
import { useTheme } from '../../context/ThemeContext';
import "./AttendanceMarking.css";

const AttendanceMarking = () => {
  const [data, setData] = useState([
    { id: "01", name: "EMP Contract", inTime: "00:00", outTime: "00:00", status: "Weekly Off" },
    { id: "02", name: "EMP Monthly", inTime: "02:00", outTime: "22:00", status: "Absent" },
    { id: "03", name: "EMP Weekly", inTime: "09:00", outTime: "17:00", status: "Absent" },
    { id: "04", name: "EMP Hourly", inTime: "09:00", outTime: "17:00", status: "Absent" },
    { id: "05", name: "EMP Unit", inTime: "09:00", outTime: "17:00", status: "Absent" },
  ]);
    const { slide } = useTheme();
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className={slide === "false" ? "mark w-full max-w-5xl bg-white shadow-lg rounded-lg p-6" : "mark1 w-full max-w-5xl bg-white shadow-lg rounded-lg p-6"}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-700">Daily Attendance</h2>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4">
            <select className="p-2 border rounded w-full md:w-auto">
              <option>All Departments</option>
            </select>
            <input type="date" className="p-2 border rounded w-full md:w-auto" />
            <button className="btn">Get Employees</button>
            <button className="btn px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700">Export</button>
          </div>
          <input type="text" placeholder="Search" className="p-2 border rounded w-1/4" />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="p-2 border">Employee Id</th>
                <th className="p-2 border">Employee Name</th>
                <th className="p-2 border">In Time</th>
                <th className="p-2 border">Out Time</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-blue-100" : "bg-white"}>
                  <td className="p-2 border text-center">{row.id}</td>
                  <td className="p-2 border text-center">{row.name}</td>
                  <td className="p-2 border text-center">{row.inTime}</td>
                  <td className="p-2 border text-center">{row.outTime}</td>
                  <td className="p-2 border text-center">
                    <select className="p-1 border rounded">
                      <option>Present</option>
                      <option>Absent</option>
                      <option>Weekly Off</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mt-4">
          <button className="btn px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceMarking;