import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Moved Router here
import App from './App';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router> {/* <Router> wraps the entire app here */}
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Router>
);
