import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="navBar">
            <h1>PayJournal v2</h1>
            <div className="links">
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
                <Link to="/contact">Contact</Link>
            </div>
        </nav>
    );
}

export default Navbar;