import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLightMode, setIsLightMode] = useState(false);
    const location = useLocation(); // Used to track the current route

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }

        // Check saved light mode preference
        const savedMode = localStorage.getItem('theme');
        if (savedMode === 'light') {
            document.body.classList.add('light-mode');
            setIsLightMode(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    const toggleLightMode = () => {
        document.body.classList.toggle('light-mode');
        const newMode = document.body.classList.contains('light-mode');
        setIsLightMode(newMode);

        // Save the mode in localStorage
        localStorage.setItem('theme', newMode ? 'light' : 'dark');
    };

    return (
        <Router>
            {/* Header with Logo and Navbar */}
            <div className="header-logo">
                <Link to="/">
                    <img
                        src={isLightMode ? `${process.env.PUBLIC_URL}/media/ninjatp.png` : `${process.env.PUBLIC_URL}/media/ninjatpd.png`}
                        alt="Home"
                        className="ninja-logo"
                    />
                </Link>
            </div>

            <div className="navbar">
                {/* Light Mode Button */}
                <button
                    className="light-mode-btn"
                    onClick={toggleLightMode}
                    style={{
                        backgroundColor: isLightMode ? '#ffffff' : '#000000',
                        color: isLightMode ? '#000000' : '#ffffff',
                    }}
                >
                    {isLightMode ? 'Dark Mode' : 'Light Mode'}
                </button>

                {/* Conditionally Render Logout Button */}
                {location.pathname === '/dashboard' && isLoggedIn && (
                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                        style={{
                            backgroundColor: 'red',
                            color: 'white',
                        }}
                    >
                        Logout
                    </button>
                )}
            </div>

            {/* App Routes */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/login"
                    element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
                />
                <Route
                    path="/register"
                    element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />}
                />
                <Route
                    path="/dashboard"
                    element={isLoggedIn ? <Dashboard handleLogout={handleLogout} /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
};

export default App;
