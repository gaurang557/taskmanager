'use client';
import React, {useEffect} from 'react'


const AssignedTo = ({task, setTask}) => {
    const [employees, setEmployees] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [filteredEmployee, setfilteredEmployee] = React.useState([]);
    useEffect(() => {
        const filtered = employees.filter((emp) =>
            emp.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setfilteredEmployee(filtered);
    }, [employees, searchTerm]);
    const [employee, setEmployee] = React.useState("");
      useEffect(() => {
        fetchemployees();
      }, []);
      const fetchemployees = async () => {
            try{
            const response = await fetch('/api/employees/crud');
            const data = await response.json();
            if (Array.isArray(data)) {
            setEmployees(data);
            } else {
            console.error('Unexpected employees response:', data);
            setEmployees([]); // fallback to empty array
            }
        } catch (error) {
            console.error('Error fetching employees:', error);
            setEmployees([]);
        }
  };
  return (
    <div>
        <label className="block text-gray-700 font-medium mb-2">Assigned To</label>
        <input
                type="text"
                placeholder="Search employee"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border text-gray-700 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
        <select
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
            className="w-full border text-gray-700 border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="">Select Employee</option>
            {filteredEmployee.map((emp) => (
                <option 
                    key={emp.id}
                    value={emp.name}
                    // onClick={() => setTask({ ...task, assignedTo: emp.name })}
                >
                    {emp.name}
                </option>
            ))}
            </select>
    </div>
  )
}

export default AssignedTo