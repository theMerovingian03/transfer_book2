import { useNavigate } from "react-router-dom";
const Dashboard = () => {

    const navigate = useNavigate();
    return (
        <div className="main-content">
            <div className="button-container">
                <button onClick={() => navigate('/records')}>View your Records</button>
                <button onClick={() => navigate('/add')}>Add a new Record</button>
            </div>
        </div>
    );
}

export default Dashboard;