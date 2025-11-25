'use client';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import { useTaskAndEmployeeStore } from '../store/tasksandemployees';
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default function Employees()  {
  const employees = useTaskAndEmployeeStore(state => state.employees);
  const setemployees = useTaskAndEmployeeStore(state => state.setemployees);
  const [showPopup, setShowPopup] = useState(false);
  const [employeeToDelete, setemployeeToDelete] = useState(null);
  const popupRef = useRef(null);
  // const session = await getServerSession(authOptions);
  const formattedemployees = employees.map(employee => ({
    ...employee,
    joiningdate: new Date(employee.joiningdate),
    dob: new Date(employee.dob),
  }));

  useEffect(() => {
    fetchemployees();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopup]);

  const fetchemployees = async () => {
    try{
    const response = await fetch('/api/employees/crud');
    const data = await response.json();
    if (Array.isArray(data)) {
      setemployees(data);
    } else if (Array.isArray(data.employees)) {
      setemployees(data.employees);
    } else {
      console.error('Unexpected employees response:', data);
      setemployees([]); // fallback to empty array
    }
  } catch (error) {
    console.error('Error fetching employees:', error);
    setemployees([]);
  }
  };
  const deleteemployee = async (id) => {
      await fetch('/api/employees/crud', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchemployees();
    setShowPopup(false);
  }
  const handleDeleteClick = (id) => {
    setemployeeToDelete(id);
    setShowPopup(true); // Show the popup
  };
  const handleCancel = () => {
    setShowPopup(false); // Close the popup
    setemployeeToDelete(null); // Reset the employee to delete
  };

  return (
    <div className="flex flex-col items-center">
      <main className="p-6">
        {/* <p>Logged in as: {session.user.email}</p> */}
        <h1 className="text-2xl font-bold mb-4 text-center">Employees List</h1>
        <div className="m-2 overflow-x-auto w-300 overflow-y-auto max-h-[70vh]">
          <table className="border border-black border-collapse w-full text-gray-800">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-black px-4 w-48 text-left">Name</th>
                <th className="border border-black px-4 w-40 text-left">Date of Birth</th>
                <th className="border border-black px-4 w-32 text-left">Gender</th>
                <th className="border border-black px-4 w-48 text-left">Joining Date</th>
                <th className="border border-black px-4 w-40 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {formattedemployees.map((employee, index) => (
                <tr key={index} className="bg-gray-100 hover:bg-gray-200">
                  <td className="border border-black h-1 px-1 py-1 overflow-x-auto">{employee.name}</td>
                  <td className="border border-black h-1 px-1 py-1">{employee.dob.toLocaleDateString()}</td>
                  <td className="border border-black h-1 px-1 py-1">{employee.gender}</td>
                  <td className="border border-black h-1 px-1 py-1">{employee.joiningdate.toLocaleDateString()}</td>
                  <td className="border border-black h-1 px-1 py-1 text-center">
                    <button
                      className="px-3 w-24 bg-red-400 rounded-md text-white hover:bg-red-500"
                      onClick={() => handleDeleteClick(employee.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Link href="/AddEmployee">
        <button className="mt-4 w-64 px-4 py-2 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600">Add employee</button>
      </Link>
      <button onClick={() => window.history.back()}
        className="mt-4 w-64 px-4 py-2 bg-green-400 text-white text-lg rounded-lg hover:bg-green-600">
        Back
    </button>
      
    {showPopup && (
        <div className="text-gray-800 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={popupRef}
            className="bg-white p-6 rounded shadow-lg"
          >
            <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
            <p className="mb-4">Do you really want to delete this employee? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => deleteemployee(employeeToDelete)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};