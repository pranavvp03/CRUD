import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");


  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const validateInputs = () => {
    const { email, password } = data;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email.");
      return false;
    }
    if(!password){
      toast.error("Password is required");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const loginUser = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const { email, password } = data;
    try {
      const res = await axios.post('/login', { email, password });
      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        localStorage.setItem('token', res.data.token);
        setData({ email: "", password: "" }); // Reset form
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={loginUser}>
              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="string"
                  className="form-control"
                  id="email"
                  placeholder="Enter Your Email..."
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="string"
                  className="form-control"
                  id="password"
                  placeholder="Enter Your Password..."
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                  
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            <p className="text-center mt-3">
              I don't have an account? 
              <a href="/register" className="link-primary"> Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;



