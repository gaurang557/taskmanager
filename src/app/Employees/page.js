'use client';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import { useTaskAndEmployeeStore } from '../store/tasksandemployees';

const employees = () => {
  const employees = useTaskAndEmployeeStore(state => state.employees);
  const setemployees = useTaskAndEmployeeStore(state => state.setemployees);
  const [showPopup, setShowPopup] = useState(false);
  const [employeeToDelete, setemployeeToDelete] = useState(null);
  const popupRef = useRef(null);
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
    const response = await fetch('/api/employees/crud');
    const data = await response.json();
    setemployees(data);
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
        <h1 className="text-2xl font-bold mb-4 text-center">Employees List</h1>
        <ul className="flex flex-wrap items-start space-x-4 space-y-4 text-gray-800 m-5 overflow-y-auto max-h-[70vh]">
          {formattedemployees.map((employee, index) => (
            <li key={index} className="border p-3 rounded-lg w-80 shadow-md bg-gray-100">
              <p><strong>Name:</strong> {employee.name}</p>
              <p><strong>Date of Birth:</strong> {employee.dob.toLocaleDateString()}</p>
              <p><strong>Gender:</strong> {employee.gender}</p>
              <p><strong>Joining Date:</strong> {employee.joiningdate.toLocaleDateString()}</p>
              <div className="flex justify-center mt-3">
                <button
                  className="px-3 w-32 py-2 bg-red-400 rounded-xl text-white hover:bg-red-500"
                  onClick={() => handleDeleteClick(employee.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
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

export default employees;