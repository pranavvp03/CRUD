import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from "react-hot-toast"


function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog({
  open,
  formData,
  setFormData,
  editingEmployee,
  employees,
  setEmployees,
  handleClose,
  validation
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if(!validation()){
      console.log(validation());
      return
    }
    else{
      toast.success("Employee edited succesfully")
    }
    try {
      
      const token = localStorage.getItem('token');
     
      if (editingEmployee) {
        // Update existing employee
        const response = await axios.put(`http://localhost:3001/updateEmployee/${editingEmployee._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(employees.map(emp => (emp._id === response.data.data._id ? response.data.data : emp))); // Update the specific employee in the list
      
      } else {
        // Add new employee
        const response = await axios.post('http://localhost:3001/employee', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(prevEmployees => [...prevEmployees, response.data.data]); // Add new employee to the list
      }
      setFormData({ name: '', number: '', position: '' }); // Clear the form after submission
     
      handleClose(); // Close the dialog after saving
    } catch (error) {
      console.error('Error saving employee data:', error);
    }
  };

  React.useEffect(() => {
    if (editingEmployee) {
      setFormData({
        name: editingEmployee.name,
        number: editingEmployee.number,
        position: editingEmployee.position
      });
    }
  }, [editingEmployee, setFormData]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        {editingEmployee ? 'Edit Employee' : 'Add Employee'}
      </DialogTitle>
      <DialogContent>
      <form onSubmit={handleSubmit} className="p-3">
  <div className="mb-3">
    <input
      type="text"
      className="form-control"
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      placeholder="Name"
      required
    />
  </div>
  <div className="mb-3">
    <input
      type="text"
      className="form-control"
      value={formData.number}
      onChange={(e) => setFormData({ ...formData, number: e.target.value })}
      placeholder="Number"
      required
    />
  </div>
  <div className="mb-3">
    <input
      type="text"
      className="form-control"
      value={formData.position}
      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
      placeholder="Position"
      required
    />
  </div>
  <DialogActions>
    <button type="submit" className="btn btn-primary">
      {editingEmployee ? 'Update Employee' : 'Add Employee'}
    </button>
    <button className="btn btn-secondary" onClick={handleClose}>
      Cancel
    </button>
  </DialogActions>
</form>
      </DialogContent>
    </Dialog>
  );
}




