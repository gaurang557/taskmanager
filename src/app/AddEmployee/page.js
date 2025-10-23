'use client';
import React from 'react'

const AddEmployee = () => {
    const [employee, setEmployee] = React.useState({
            name: 'John Lang',
            dob: new Date('09/10/1975').toISOString().split('T')[0],
            gender: 'Male',
            joiningdate: '23/09/2002',
        });
        const handleClick = async (e) => {
            e.preventDefault();
            const objmapped = {
                ...employee,
                joiningdate: new Date().toISOString(),
                dob: new Date(employee.dob).toISOString(),
            }
            await fetch('/api/employees/crud', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(objmapped),
            });
            setEmployee({
                name: '',
                dob: new Date('09/10/1975').toISOString().split('T')[0],
                gender: '',
                joiningdate: '23/09/2002',
            });
        }
  return (
    <div className="min-h-screen bg-gray-400 flex flex-col items-center justify-center">
        <form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Add Employee</h2>
            <div>
                <label className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                type="text"
                placeholder="Enter employee Name"
                value={employee.name}
                onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                className="w-full border text-gray-400 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-gray-700 font-medium mb-2">Date of Birth</label>
                <input
                type="date"
                placeholder="Enter assignee name"
                value={employee.dob}
                onChange={(e) => setEmployee({ ...employee, dob: e.target.value })}
                className="w-full border text-gray-400 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-gray-700 font-medium mb-2">Gender</label>
                <input
                type="text"
                value={employee.gender}
                onChange={(e) => setEmployee({ ...employee, gender: e.target.value })}
                className="w-full border text-gray-400 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button
                type="submit"
                onClick={handleClick}
                className="w-full bg-blue-500 text-white text-lg py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                Add employee
            </button>
        </form>
        <button onClick={() => window.history.back()}
         className="mt-4 w-64 px-4 py-2 bg-green-400 text-white text-lg rounded-lg hover:bg-green-600">
            Back
        </button>
    </div>
  )
}

export default AddEmployee