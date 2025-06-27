import React, { useState, useEffect } from 'react';
import {
    Routes,
    Route,
    Navigate,
    Link,
    useNavigate,
    useLocation
} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ChallengeList from './pages/ChallengeList';
import ChallengeDetail from './pages/ChallengeDetail';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLightMode, setIsLightMode] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // On mount, restore login + theme
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLoggedIn(true);
        }
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-mode');
            setIsLightMode(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login', { replace: true });
    };

    const toggleLightMode = () => {
        const next = !isLightMode;
        document.body.classList.toggle('light-mode', next);
        setIsLightMode(next);
        localStorage.setItem('theme', next ? 'light' : 'dark');
    };

    const navBtnStyle = { padding: '6px 12px', fontSize: '14px', marginLeft: '0.5rem' };

    return (
        <>
            {/* Logo */}
            <div className="header-logo">
                <Link to="/">
                    <img
                        src={
                            isLightMode
                                ? `${process.env.PUBLIC_URL}/media/ninjatp.png`
                                : `${process.env.PUBLIC_URL}/media/ninjatpd.png`
                        }
                        alt="Home"
                        className="ninja-logo"
                    />
                </Link>
            </div>

            {/* Fixed Navbar */}
            <div
                className="navbar"
                style={{
                    position: 'fixed',
                    top: '10px',
                    left: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    zIndex: 1000
                }}
            >
                <button className="light-mode-btn" onClick={toggleLightMode} style={navBtnStyle}>
                    {isLightMode ? 'Dark Mode' : 'Light Mode'}
                </button>

                {isLoggedIn && (
                    <>
                        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                            <button className="enter-btn" style={navBtnStyle}>Dashboard</button>
                        </Link>
                        <Link to="/challenges" style={{ textDecoration: 'none' }}>
                            <button className="enter-btn" style={navBtnStyle}>Challenges</button>
                        </Link>
                        <button className="logout-btn" onClick={handleLogout} style={navBtnStyle}>
                            Logout
                        </button>
                    </>
                )}
            </div>

            {/* Push content down below navbar */}
            <main style={{ paddingTop: '60px' }}>
                <Routes>
                    {/* Public */}
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/login"
                        element={
                            isLoggedIn
                                ? <Navigate to="/dashboard" replace />
                                : <Login setIsLoggedIn={setIsLoggedIn} />
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            isLoggedIn
                                ? <Navigate to="/dashboard" replace />
                                : <Register />
                        }
                    />

                    {/* Protected */}
                    <Route
                        path="/dashboard"
                        element={
                            isLoggedIn
                                ? <Dashboard handleLogout={handleLogout} />
                                : <Navigate to="/login" replace />
                        }
                    />
                    <Route
                        path="/challenges"
                        element={
                            isLoggedIn
                                ? <ChallengeList />
                                : <Navigate to="/login" replace />
                        }
                    />
                    <Route
                        path="/challenges/:id"
                        element={
                            isLoggedIn
                                ? <ChallengeDetail />
                                : <Navigate to="/login" replace />
                        }
                    />

                    {/* Fallback */}
                    <Route
                        path="*"
                        element={
                            isLoggedIn
                                ? <Navigate to="/dashboard" replace />
                                : <Navigate to="/login" replace />
                        }
                    />
                </Routes>
            </main>
        </>
    );
};

export default App;
