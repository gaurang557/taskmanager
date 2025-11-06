'use client';
import React from 'react'

const AddEmployee = () => {
    const [employee, setEmployee] = React.useState({
        name: 'John Lang',
        dob: new Date('09/10/1975').toISOString().split('T')[0],
        gender: 'Male',
        joiningdate: new Date().toISOString().split('T')[0],
    });

    const [error, setError] = React.useState('');

    const handleClick = async (e) => {
        e.preventDefault();

        // Validation: minimum 5 characters for name
        if (employee.name.trim().length < 5) {
            setError('Name must be at least 5 characters long.');
            return;
        }

        setError('');

        const objmapped = {
            ...employee,
            joiningdate: new Date(employee.joiningdate).toISOString(),
            dob: new Date(employee.dob).toISOString(),
        };

        await fetch('/api/employees/crud', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(objmapped),
        });

        setEmployee({
            name: '',
            dob: new Date('09/10/1975').toISOString().split('T')[0],
            gender: '',
            joiningdate: new Date('09/23/2002').toISOString().split('T')[0],
        });
    };

    return (
        <div className="min-h-screen bg-gray-400 flex flex-col items-center justify-center">
            <form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Add Employee</h2>
                
                {/* Name Input */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Name</label>
                    <input
                        type="text"
                        placeholder="Enter employee name"
                        value={employee.name}
                        onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                        className="w-full border text-gray-700 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>

                {/* DOB */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Date of Birth</label>
                    <input
                        type="date"
                        value={employee.dob}
                        onChange={(e) => setEmployee({ ...employee, dob: e.target.value })}
                        className="w-full border text-gray-700 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Gender */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Gender</label>
                    <select
                        value={employee.gender}
                        onChange={(e) => setEmployee({ ...employee, gender: e.target.value })}
                        className="w-full border text-gray-700 border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Joining Date */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Joining Date</label>
                    <input
                        type="date"
                        value={employee.joiningdate}
                        onChange={(e) => setEmployee({ ...employee, joiningdate: e.target.value })}
                        className="w-full border text-gray-700 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    onClick={handleClick}
                    className="w-full bg-blue-500 text-white text-lg py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Add Employee
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

export default AddEmployee;