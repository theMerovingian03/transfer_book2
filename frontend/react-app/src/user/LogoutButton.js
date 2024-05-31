// LogoutButton.js
import React, { useContext } from 'react';
import { AuthContext } from '../util/AuthContext';
import { useNavigate } from 'react-router-dom';


const LogoutButton = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
        navigate('/login');
    }

    return (
        <button className="logoutButton" onClick={handleLogout}>Logout</button>
    );
}

export default LogoutButton;
