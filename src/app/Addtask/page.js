'use client';
import AddTaskForm from '../components/AddTaskForm.js';
import React from 'react'


const Addtask = () => {

    const [task, setTask] = React.useState({
        description: '',
        assignedTo: '',
        status: '',
        expectedDateOfCompletion: new Date().toISOString().split('T')[0],
        assignedDate: new Date().toISOString().split('T')[0],
    });

    const handleClick = async (e) => {
        e.preventDefault();
        const objmapped = {
            ...task,
            expectedDateOfCompletion: new Date(task.expectedDateOfCompletion).toISOString(),
            assignedDate: new Date(task.assignedDate).toISOString(),
        }
        await fetch('/api/tasks/crud', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(objmapped),
        });
        setTask({
            description: '',
            assignedTo: '',
            expectedDateOfCompletion: new Date().toISOString().split('T')[0],
            assignedDate: new Date().toISOString().split('T')[0],
            status: ''
        });
    }
  return (
    <div>
        <h1>Add Task Page</h1>
        <AddTaskForm task={task} setTask={setTask} handleClick={handleClick} />
    </div>
  )
}

export default Addtask