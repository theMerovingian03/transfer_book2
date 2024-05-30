// Navbar.js
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../util/AuthContext';
import LogoutButton from '../user/LogoutButton';

const Navbar = () => {
    const { token } = useContext(AuthContext);

    return (
        <nav className="navBar">
            <h1>PayJournal v2</h1>
            <div className="links">
                {token ? (
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
