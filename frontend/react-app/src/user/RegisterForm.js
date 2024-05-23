import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config";

/*
* email: jane.doe2@example.com
* password: password123$
*/

const RegisterForm = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name,
            email,
            password
        };

        try {
            const response = await fetch(`${BASE_URL}/api/users/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User registered successfully: ', data);
                navigate('/login');
            } else {
                const errorData = await response.json();
                console.error('Error registering user: ', errorData);
            }

        } catch (error) {
            console.error('Error registering user: ', error);
        }
    }

    return (
        <div className="main-content">
            <div className="formContainer">
                <h3>Sign-Up</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name</label><br />
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required /><br />
                    <label htmlFor="email">Valid E-mail ID</label><br />
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required /><br />
                    <label htmlFor="password">Password</label><br />
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;