import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../config';

const ViewRecords = () => {
    const [records, setRecords] = useState([]);
    const navigate = useNavigate();
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };

    useEffect(() => {
        const fetchRecords = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('No token found');
                return;
            }

            try {
                const response = await axios.get(`${BASE_URL}/api/records/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    setRecords(response.data);
                } else {
                    console.error('Failed to fetch records', response.status);
                }

            } catch (error) {
                console.error('An error occurred while fetching records', error);
            }
        };
        fetchRecords();
    }, []);

    const handleRowClick = (id) => {
        navigate(`/records/${id}`);
    };

    return (
        <div className="table-div">
            <h3>Record History</h3>
            <div className="table-container">
                <table className="table1">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Type</th>
                            <th>Date Added</th>
                            <th>Date Paid</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.length > 0 ? (
                            records.map((record) => (
                                <tr key={record.id} onClick={() => handleRowClick(record.id)}>
                                    <td>{record.title}</td>
                                    <td>{record.amount}</td>
                                    <td>{record.transaction_type}</td>
                                    <td>{record.date_added ? formatDate(record.date_added) : 'N/A'}</td>
                                    <td>{record.date_payed ? formatDate(record.date_payed) : 'N/A'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No records found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="table-button-div">
                <button onClick={() => navigate('/add')}>New</button>
                <button onClick={() => navigate('/')}>Back</button>
            </div>
        </div>
    );
}

export default ViewRecords;
