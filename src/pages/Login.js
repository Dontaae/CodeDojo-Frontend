import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [stayLoggedIn, setStayLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://cododojo-backend.onrender.com/login', { username, password });
            const token = response.data.access_token;

            // Save token based on "Stay Logged In" checkbox state
            if (stayLoggedIn) {
                localStorage.setItem('token', token);
            } else {
                sessionStorage.setItem('token', token);
            }

            setErrorMessage('');
            setIsLoggedIn(true);
        } catch (err) {
            setErrorMessage('Invalid credentials!');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div style={{ position: 'relative' }}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ paddingRight: '50px' }}
                    />
                    <span
                        onClick={togglePasswordVisibility}
                        className="show-password"
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </span>
                </div>
                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        id="stayLoggedIn"
                        checked={stayLoggedIn}
                        onChange={(e) => setStayLoggedIn(e.target.checked)}
                    />
                    <label htmlFor="stayLoggedIn">Stay Logged In</label>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account?{' '}
                <a href="/register" className="switch-link">Register</a>
            </p>
        </div>
    );
};

export default Login;
