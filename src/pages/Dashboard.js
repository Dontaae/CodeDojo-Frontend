// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard({ handleLogout }) {
    const [userData, setUserData] = useState(null);
    const [leaderboard, setLeaderboard] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAll = async () => {
            setIsLoading(true);
            try {
                const [userRes, lbRes] = await Promise.all([
                    API.get('/api/user'),
                    API.get('/api/leaderboard')
                ]);
                setUserData(userRes.data);
                setLeaderboard(lbRes.data);
                setError('');
            } catch (err) {
                setError('Failed to load dashboard data');
                if (err.response?.status === 401) {
                    handleLogout();
                    navigate('/login');
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchAll();
    }, [handleLogout, navigate]);

    if (isLoading) return <p>Loading dashboard...</p>;
    if (error) return <p className="error-message">{error}</p>;

    // XP thresholds for each belt
    const RANKS = [
        { name: "White Belt", xp: 0 },
        { name: "Yellow Belt", xp: 20 },
        { name: "Orange Belt", xp: 40 },
        { name: "Green Belt", xp: 70 },
        { name: "Blue Belt", xp: 100 },
        { name: "Purple Belt", xp: 140 },
        { name: "Brown Belt", xp: 190 },
        { name: "Black Belt", xp: 250 }
    ];

    // find current and next
    const currentIndex = RANKS.slice().reverse().findIndex(r => userData.xp >= r.xp);
    const currentRank = RANKS[RANKS.length - 1 - currentIndex];
    const nextRank = currentIndex > 0
        ? RANKS[RANKS.length - currentIndex]
        : null;

    const xpIntoLevel = nextRank
        ? userData.xp - currentRank.xp
        : 0;
    const xpForLevel = nextRank
        ? nextRank.xp - currentRank.xp
        : 1;
    const pct = nextRank
        ? Math.round((xpIntoLevel / xpForLevel) * 100)
        : 100;

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-header">
                Welcome, <strong>{userData.username}</strong>
            </h1>

            <div className="dashboard-content">
                <div className="dashboard-card" style={{ maxWidth: '600px' }}>
                    <h2>Total XP Earned</h2>
                    <p><strong>{userData.xp}</strong></p>
                    <p>Current Rank: <strong>{userData.rank}</strong></p>
                    {nextRank && (
                        <>
                            <div className="progress-container">
                                <div
                                    className="progress-bar"
                                    style={{ width: `${pct}%` }}
                                />
                            </div>
                            <p>{xpForLevel - xpIntoLevel} XP to {nextRank.name}</p>
                        </>
                    )}
                    {!nextRank && <p>You’ve reached the highest rank!</p>}

                    <h3 style={{ marginTop: '1rem' }}>Practice Sessions</h3>
                    {userData.practice_summary.length === 0
                        ? <p>No sessions logged yet.</p>
                        : (
                            <ul style={{ textAlign: 'left' }}>
                                {userData.practice_summary.map(ps => (
                                    <li key={ps.challenge_id}>
                                        {ps.title}: <strong>{ps.runs}</strong> run{ps.runs !== 1 && 's'}
                                    </li>
                                ))}
                            </ul>
                        )}
                </div>

                {/* Leaderboard */}
                <div className="dashboard-card" style={{ maxWidth: '300px' }}>
                    <h2>Leaderboard</h2>
                    <ol style={{ textAlign: 'left' }}>
                        {leaderboard.map(u => (
                            <li key={u.username}>
                                {u.username}: {u.xp} XP
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
}
