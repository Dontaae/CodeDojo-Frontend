// src/api.js
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000'   // removed the "/api" prefix
});

API.interceptors.request.use(config => {
    // attach token for both /login, /register and /api/* routes
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default API;
