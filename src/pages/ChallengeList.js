import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';

export default function ChallengeList() {
    const [challenges, setChallenges] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const load = async () => {
        setIsLoading(true);
        try {
            const res = await API.get('/api/challenges');
            setChallenges(res.data);
        } catch {
            navigate('/login', { replace: true });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    if (isLoading) return <p>Loading challenges…</p>;

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-header">Challenges</h1>
            <div className="dashboard-content">
                {challenges.map(c => (
                    <div key={c.id} className="dashboard-card">
                        <h2>{c.title}</h2>
                        <p>Difficulty: {c.difficulty}</p>
                        <p>Base XP: {c.xp_reward}</p>
                        <p>Attempts: {c.run_count}</p>
                        <Link to={`/challenges/${c.id}`} style={{ textDecoration: 'none' }}>
                            <button className="enter-btn">Practice & Earn</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
