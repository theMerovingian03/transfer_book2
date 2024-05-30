// AuthContext.js
import { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import BASE_URL from '../config';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    const login = (jwt) => {
        localStorage.setItem('token', jwt);
        setToken(jwt);
    };

    const logout = async () => {
        const response = await fetch(`${BASE_URL}/api/users/logout/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            localStorage.removeItem('token');
            setToken('');
            document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        } else {
            console.error('Logout Failed');
        }
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
