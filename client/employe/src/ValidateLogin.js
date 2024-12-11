import React, { useState } from 'react';
import { toast } from "react-hot-toast";
import axios from "axios";

const LoginForm = ({ onSuccess }) => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        let validationErrors = {};

        if (!validateEmail(email)) {
            validationErrors.email = "Please enter a valid email address.";
        }

        if (!validatePassword(password)) {
            validationErrors.password = "Password must be at least 6 characters long, and include at least one uppercase letter, one lowercase letter, and one number.";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; // Stop if there are validation errors
        }

        try {
            const res = await axios.post('/login', { email, password });
            if (res.data.error) {
                toast.error(res.data.error);
            } else {
                localStorage.setItem('token', res.data.token);
                setData({ email: "", password: "" }); // Clear form data
                onSuccess(); // Notify parent of success
            }
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    placeholder="Enter Your Email..."
                    value={data.email}
                    onChange={(e) => {
                        setData({ ...data, email: e.target.value });
                        setErrors({ ...errors, email: "" }); // Clear error on change
                    }}
                    required
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    placeholder="Enter Your Password..."
                    value={data.password}
                    onChange={(e) => {
                        setData({ ...data, password: e.target.value });
                        setErrors({ ...errors, password: "" }); // Clear error on change
                    }}
                    required
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
    );
};

export default LoginForm;
