import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="not-found">
            <h2>Oops!</h2>
            <p>The page you were looking for was not found on this server...</p>
            <p>Go back to<Link to="/">Home Page.</Link></p>
        </div>
    );
}

export default NotFound;