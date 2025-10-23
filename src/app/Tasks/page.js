'use client';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import { useTaskAndEmployeeStore } from '../store/tasksandemployees';
import { useRouter } from 'next/navigation';

const Tasks = () => {
  const router = useRouter();
  const tasks = useTaskAndEmployeeStore(state => state.tasks);
  const setTasks = useTaskAndEmployeeStore(state => state.setTasks);
  const [showPopup, setShowPopup] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const popupRef = useRef(null);
  const formattedTasks = tasks.map(task => ({
    ...task,
    expectedDateOfCompletion: new Date(task.expectedDateOfCompletion),
    assignedDate: new Date(task.assignedDate),
  }));

  useEffect(() => {
    fetchTasks();
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

  const fetchTasks = async () => {
    const response = await fetch('/api/tasks/crud');
    const data = await response.json();
    setTasks(data);
  };
  const deleteTask = async (id) => {
      await fetch('/api/tasks/crud', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchTasks();
    setShowPopup(false);
  }
  const handleDeleteClick = (id) => {
    setTaskToDelete(id);
    setShowPopup(true); // Show the popup
  };
  const handleCancel = () => {
    setShowPopup(false); // Close the popup
    setTaskToDelete(null); // Reset the task to delete
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };
  return (
    <div className="flex flex-col items-center">
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Task List</h1>
        <ul className="flex flex-wrap items-start space-x-4 space-y-4 text-gray-800 m-5 overflow-y-auto max-h-[70vh]">
          {formattedTasks.map((task, index) => (
            <li key={index} className="border p-3 w-80 rounded-lg shadow-md bg-gray-100">
              <p><strong>Description:</strong> {task.description}</p>
              <p><strong>Assigned To:</strong> {task.assignedTo}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <p><strong>Expected Completion:</strong> {task.expectedDateOfCompletion.toLocaleDateString()}</p>
              <p><strong>Assigned Date:</strong> {task.assignedDate.toLocaleDateString()}</p>
              <div className="flex justify-center mt-3">
                <button
                  className="px-3 w-32 py-2 bg-red-400 rounded-xl text-white hover:bg-red-500"
                  onClick={() => handleDeleteClick(task.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <Link href="/Addtask">
        <button className="mt-4 w-64 px-4 py-2 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600">Add Task</button>
      </Link>
      <button onClick={handleBack} className="mt-4 w-64 px-4 py-2 bg-green-400 text-white text-lg rounded-lg hover:bg-green-600">Back</button>
      
    {showPopup && (
        <div className="text-gray-800 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={popupRef}
            className="bg-white p-6 rounded shadow-lg"
          >
            <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
            <p className="mb-4">Do you really want to delete this task? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => deleteTask(taskToDelete)}
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

export default Tasks;