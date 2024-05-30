import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../config";

const GetProfile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');

            // Log the token to the console
            console.log('Token:', token);

            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            // Log the headers to the console
            console.log('Request Headers:', headers);

            const response = await axios.get(`${BASE_URL}/api/users/user`, {
                headers: headers,
                withCredentials: true, // Include cookies
            });

            // Log the response to the console
            console.log('Response:', response);

            setProfile(response.data);
        } catch (error) {
            setError(error.message);
            console.error('Error:', error.response || error.message);
        }
    };

    const logCookies = () => {
        console.log('Document Cookies:', document.cookie);
    };

    return (
        <div>
            <button onClick={logCookies}>Log Cookies</button>
            {profile ? (
                <div>
                    <h2>User Profile</h2>
                    <p>ID: {profile.id}</p>
                    <p>Name: {profile.name}</p>
                    <p>Email: {profile.email}</p>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default GetProfile;
