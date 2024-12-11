import React, { useState, useEffect } from 'react';
import ButtonAppBar from './Nav'
import axios from "axios"
import DraggableDialog from './EditButton'; // Use DraggableDialog for editing
import { toast } from "react-hot-toast"

function Home() {
  const [pop, setPop] = useState(false); // This controls the dialog state
  const [employees, setEmployees] = useState([]); // List of employees
  const [editingEmployee, setEditingEmployee] = useState(null); // Holds the employee being edited
  const [formData, setFormData] = useState({ name: '', number: '', position: '' });

  const validation = () => {
    
    if(formData.number.length < 10){
      toast.error("number must have 10 characters")
      return false 
    }
    return true
  }

  useEffect(() => {

    const fetchEmployees = async () => {
     
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/getEmployee', {
          headers: { Authorization: `Bearer ${token}` },
          
          
        });
        setEmployees(response.data.data); // Populate the employees list
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
     
    };

    fetchEmployees();
  }, []);
const handleClose=()=>{
  setPop(false)
} 
  const handleEdit = (employee) => {
    setPop(true); 
    setEditingEmployee(employee); // Set the employee to be edited
    setFormData({ name: employee.name, number: employee.number, position: employee.position }); // Pre-fill form
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3001/deleteEmployee/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(employees.filter(emp => emp._id !== id)); // Update employee list after deletion
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div>
      <ButtonAppBar />
      <div className="container mt-2">
        <h2>Employee Management</h2>
       <ul className="list-group">
          {employees.map((employee) => (
            <li key={employee._id} className="list-group-item">
              <h5>{employee.name}</h5>
              <p>Number: {employee.number}</p>
              <p>Position: {employee.position}</p>
              <button className ="btn btn-primary" style={{ marginRight: '10px' }} onClick={() => handleEdit(employee)}>Edit</button>
              <button className="btn btn-danger" onClick={() => handleDelete(employee._id)}>Delete</button>
            </li>
          ))}
        </ul>
        <DraggableDialog
          open={pop} // Controls whether the dialog is open
          handleClose={handleClose} // Function to close the dialog
          formData={formData} // Pass current form data
          setFormData={setFormData} // Pass function to update form data
          editingEmployee={editingEmployee} // Pass the employee being edited
          employees={employees} // Pass the employees list
          setEmployees={setEmployees} // Pass function to update employees list
          validation={validation}
        />
      </div>
    </div>
  );
}

export default Home;







