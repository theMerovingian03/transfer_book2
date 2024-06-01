// AuthContext.js
import { createContext, useState, useEffect, useContext } from 'react';
import BASE_URL from '../config';
import axios from 'axios';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            try {
                await axios.get(`${BASE_URL}/api/records./validate-token/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setIsAuthenticated(true)
            } catch (error) {
                console.error('Token validation failed', error);
                setIsAuthenticated(false);
                localStorage.removeItem('token');
            }
        }
        validateToken();
    }, []);

    const login = (jwt) => {
        localStorage.setItem('token', jwt);
        setIsAuthenticated(true);
    };

    const logout = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/api/users/logout/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        } else {
            console.error('Logout Failed');
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
