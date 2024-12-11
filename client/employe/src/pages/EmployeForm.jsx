import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { toast } from "react-hot-toast"

function EmployeForm() {

    const [employeeName, setEmployeeName] = useState('');
    const [employeeNumber, setEmployeeNumber] = useState('');
    const [employeePosition, setEmployeePosition] = useState('');
    const employeeNumberRegex = /^[0-9]+$/;
    useEffect(() => {
        console.log('afsd');
        
    },[employeeName])
    const validateInputs = ()=>{
        if(!employeeName){
            toast.error("Please enter employe name")
            return false
        }
       if(!employeeNumber){
            toast.error("Please enter employe number")
            return false
        }
        if(!employeeNumberRegex.test(employeeNumber)){
            toast.error("Please enter a valid number")
            return false
        }
        if(!employeePosition){
            toast.error("Please enter a position")
            return false
        }
        if(employeeNumber.length < 10){
            toast.error("phone number must have 10 digits")
            return false
        }

        return true
    }
    

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(!validateInputs()) return;
        
         const employeData = {
            name:employeeName,
            number:employeeNumber,
            position:employeePosition
         }
       
         try {
            const token=localStorage.getItem('token')
            const response = await axios.post('http://localhost:3001/employee',employeData,
                {headers:{Authorization:`Bearer ${token}`}}
                
            );
            toast.success("employe created succesfuly")
            console.log('data submitted succesfully', response.data);
            console.log("dsafl",response.data.data) 
           
           
            
         } catch (error) {
            console.error('error submitting data', error);
            toast.error('error submitting data')
  
         }

    }

  return (
    
    <div class="container mt-2" >
    <h2>Employee Form</h2>
    <form onSubmit={handleSubmit}>
        <div class="form-group">
            <label for="employeeName">Employee Name</label>
            <input onChange={(e)=> setEmployeeName(e.target.value)} type="text" class="form-control form-control-lg" id="employeeName" placeholder="Enter name" />
        </div>
        <div class="form-group">
            <label for="employeeNumber">Employee Number</label>
            <input  onChange={(e)=>setEmployeeNumber(e.target.value)} type="text" class="form-control form-control-lg" id="employeeNumber" placeholder="Enter number" />
        </div>
        <div class="form-group">
            <label for="employeePosition">Position</label>
            <input  onChange={(e)=>setEmployeePosition(e.target.value)} type="text" class="form-control form-control-lg" id="employeePosition" placeholder="Enter position" />
        </div>
       
        <button type='submit' class="btn btn-success">Submit</button>
    </form >
</div>

  )
}

export default EmployeForm
