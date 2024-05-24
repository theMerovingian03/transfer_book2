import { useEffect, useState } from "react";
import BASE_URL from "../config";

const GetProfile = () => {
    const [profile, setProfile] = useState(null)
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = () => {
        const token = localStorage.getItem('token');

        fetch(`${BASE_URL}/api/users/user/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    throw new Error('Response error: ', response.status);
                }
                return response.json();
            })
            .then(data => {
                setProfile(data);
            })
            .catch(error => {
                setError(error.message);
            });
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
}

export default GetProfile;