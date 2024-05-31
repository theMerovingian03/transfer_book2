import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../config";
import { useParams, useNavigate } from "react-router-dom";

const RecordDetail = () => {
    const { id } = useParams();
    const [record, setRecord] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };

    useEffect(() => {
        const fetchRecord = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${BASE_URL}/api/records/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });

                setRecord(response.data);

            } catch (error) {
                setError(error.message);
            }
        };
        fetchRecord();
    }, [id]);

    const handleDelete = async () => {
        // Display confirmation dialog
        const confirmDelete = window.confirm('Are you sure you want to delete this record?');

        // If user confirms deletion
        if (confirmDelete) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.delete(`${BASE_URL}/api/records/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });

                if (response.status === 200) {
                    navigate('/records');
                } else {
                    console.error('Failed to delete record');
                }
            } catch (error) {
                console.error('An error occurred while deleting record', error);
            }
        }
    };


    const handleEdit = (id) => {
        navigate(`/edit/${id}`)
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    if (!record) {
        return <div>Loading record...</div>
    }

    return (
        <div className="table-div">
            <h3>Record Detail</h3>
            <table className="table1">
                <tr>
                    <th>Parameter</th>
                    <th>Detail</th>
                </tr>
                <tr>
                    <td>Title</td>
                    <td>{record.title}</td>
                </tr>
                <tr>
                    <td>Amount</td>
                    <td>{record.amount}</td>
                </tr>
                <tr>
                    <td>Type</td>
                    <td>{record.transaction_type}</td>
                </tr>
                <tr>
                    <td>Date Payed</td>
                    <td>{record.date_payed ? formatDate(record.date_payed) : 'N/A'}</td>
                </tr>
                <tr>
                    <td>Date Added</td>
                    <td>{record.date_added ? formatDate(record.date_added) : 'N/A'}</td>
                </tr>
            </table>
            <div className="table-button-div">
                <button onClick={() => navigate('/add')}>New</button>
                <button onClick={() => handleEdit(record.id)}>Edit</button>
                <button onClick={() => handleDelete()}>Delete</button>
                <button onClick={() => navigate('/')}>Back</button>
            </div>
        </div>
    );
}

export default RecordDetail;