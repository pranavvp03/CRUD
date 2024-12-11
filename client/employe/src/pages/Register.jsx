import React, { useState, useEffect } from 'react'
import axios from "axios"
import { toast } from "react-hot-toast"
import { useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()
  const token=localStorage.getItem('token')
  const [data,setData] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
  });

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[])

  const validateInputs = () => {
    const { email, password, confirmPassword } = data;
    const errors = [];
    if (!data.name) {
      errors.push("Name is required");
    }
  
    if (!data.email) {
      errors.push("Email is required");
    }
  
    if (!data.password) {
      errors.push("Password is required");
    }
  
    if (errors.length > 0) {
      toast.error(errors.join("\n"));
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email.");
      return false;
    }
    if (!password) {
      toast.error("Please enter a password.");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }
    return true;
  };

  
  const RegisterUser = async (e)=>{
  // register(data)
    e.preventDefault()
  
     if (!validateInputs()) return;
    const {name,email,password} = data
    try {
      const {data} = await axios.post('/register', {
        name,email,password
      })
      if (data.error) {
        toast.error(data.error)
      }else{
        setData({})
        toast.success('Register succesfull welcome to login page')
        navigate('/login')
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className="container mt-5">
  <div className="row justify-content-center">
    <div className="col-md-4">
      <div className="card" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="card-header text-center">
          <h3>Register</h3>
        </div>
        <div className="card-body">
          <form onSubmit={RegisterUser}>
            <div className="form-group mb-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter Your Name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Enter Your Email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter Your Password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Conform Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter Your Password"
                value={data.confirmPassword}
                onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
            <p className="text-center mt-3">
          I have already account?
          <a href="/login" className="link-primary">login</a>
           </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default Register
