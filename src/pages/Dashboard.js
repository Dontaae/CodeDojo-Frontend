import React from 'react';

const Dashboard = ({ handleLogout }) => {
    return (
        <div className="dashboard-container">
            {/* Header */}
            <header className="dashboard-header">
                <h1>Welcome to CodeDojo</h1>
            </header>

            {/* Main Dashboard Content */}
            <div className="dashboard-content">
                <div className="dashboard-card">
                    <h2>Profile</h2>
                    <p>Username: <strong>testuser</strong></p>
                    <p>Rank: <strong>White Belt</strong></p>
                </div>

                <div className="dashboard-card">
                    <h2>Progress</h2>
                    <p>Challenges Completed: <strong>5</strong></p>
                    <p>Next Challenge: <strong>JavaScript Basics</strong></p>
                </div>

                <div className="dashboard-card">
                    <h2>add new features </h2>
                    <p>comming whenever laziness stops hitting</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
