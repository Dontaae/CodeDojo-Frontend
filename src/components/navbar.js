import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBar({ handleLogout, toggleLightMode, isLightMode }) {
    const navigate = useNavigate();

    const onLogout = () => {
        handleLogout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/dashboard">
                <button className="enter-btn" style={{ padding: '8px 12px', fontSize: '14px', marginRight: '0.5rem' }}>
                    Dashboard
                </button>
            </Link>
            <button className="logout-btn" onClick={onLogout}>
                Logout
            </button>
            <button className="light-mode-btn" onClick={toggleLightMode} style={{ marginLeft: '0.5rem' }}>
                {isLightMode ? 'Dark Mode' : 'Light Mode'}
            </button>
        </nav>
    );
}
