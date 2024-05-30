import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config";
import { AuthContext } from '../util/AuthContext';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);  // Importing login function from context

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/api/users/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                login(data.jwt);  // Use the login function to set the token
                navigate('/profile');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Login failed');
            }
        } catch (error) {
            console.error("An error occurred:", error);
            setError('An unexpected error occurred');
        }
    };

    return (
        <div className="main-content">
            <div className="formContainer">
                <h3>Login</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">E-mail ID</label><br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required /><br />
                    <label htmlFor="password">Password</label><br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                    <button type="submit">Submit</button><br />
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
}

export default LoginForm;
