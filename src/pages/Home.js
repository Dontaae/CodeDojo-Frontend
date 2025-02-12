import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-container">
            <h1 className="home-header">CodeDojo</h1>
            <p className="home-subtext">The Ultimate Coding Practice Hub.</p>
            <div className="mission-statement">
                <h2>Unlock your potential as a programmer!</h2>
                <p>
                    CodeDojo is the perfect starting point for beginners to master coding through engaging challenges,
                    trackable progress, and a dojo-inspired environment of learning and growth.
                </p>
                <Link to="/login" className="enter-btn">
                    Enter the Dojo
                </Link>
            </div>
        </div>
    );
};

export default Home;
