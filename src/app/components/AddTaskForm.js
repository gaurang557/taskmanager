'use client';
import React from 'react';
import AssignedTo from './AssignedTo';

const AddTaskForm = ({ task, setTask, handleClick }) => {
  return (
    <div className="min-h-screen bg-gray-400 flex flex-col items-center justify-center">
      <form
        onSubmit={handleClick}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Add Task</h2>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <input
            type="text"
            placeholder="Enter task description"
            value={task.description || ''}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            className="w-full border text-gray-400 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <AssignedTo task={task} setTask={setTask} />

        <div>
          <label className="block text-gray-700 font-medium mb-2">Expected Date Of Completion</label>
          <input
            type="date"
            value={task.expectedDateOfCompletion || ''}
            onChange={(e) => setTask({ ...task, expectedDateOfCompletion: e.target.value })}
            className="w-full border text-gray-400 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Assigned Date</label>
          <input
            type="date"
            value={task.assignedDate || ''}
            onChange={(e) => setTask({ ...task, assignedDate: e.target.value })}
            className="w-full border text-gray-400 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Status</label>
          <input
            type="text"
            placeholder="Enter task status"
            value={task.status || ''}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
            className="w-full border text-gray-400 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Add Task
        </button>
      </form>

      <button
        onClick={() => window.history.back()}
        className="mt-4 w-64 px-4 py-2 bg-green-400 text-white text-lg rounded-lg hover:bg-green-600"
      >
        Back
      </button>
    </div>
  );
};

export default AddTaskForm;
