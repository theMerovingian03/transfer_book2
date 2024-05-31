// Navbar.js
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../util/AuthContext';
import LogoutButton from '../user/LogoutButton';

const Navbar = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <nav className="navBar">
            <h1>Transfer Book v2</h1>
            <div className="links">
                {isAuthenticated ? (
                    <LogoutButton />
                ) : (
                    <div className="links">
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/contact">Contact</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
