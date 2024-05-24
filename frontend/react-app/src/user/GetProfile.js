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
            const response = await axios.get(`${BASE_URL}/api/users/user`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true, // Include cookies
            });

            setProfile(response.data);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
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
