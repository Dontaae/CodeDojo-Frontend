import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://cododojo-backend.onrender.com/register', {
                username,
                email,
                password,
            });
            setSuccessMessage(response.data.message || 'User registered successfully!');
            setErrorMessage('');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setErrorMessage(err.response?.data?.message || 'Registration failed. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <button type="submit">Register</button>
            </form>
            <div className="switch-link-container">
                <span>Already have an account? </span>
                <Link to="#/login" className="switch-link">Login</Link>
            </div>
        </div>
    );
};

export default Register;