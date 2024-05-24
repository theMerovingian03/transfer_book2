import { useNavigate } from "react-router-dom";
import BASE_URL from "../config";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();

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
            navigate('/login');
            console.log("Logged out!")
        } else {
            console.error('Logout Failed');
        }
    };

    return (
        <button className="logoutButton" onClick={handleLogout}>Logout</button>
    );
}

export default LogoutButton;