import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../config';

const ViewRecords = () => {
    const [records, setRecords] = useState([]);

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

    return (
        <div className="table-div">
            <h3>Record History</h3>
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
                            <tr key={record.id}>
                                <td>{record.title}</td>
                                <td>{record.amount}</td>
                                <td>{record.transaction_type}</td>
                                <td>{record.date_added}</td>
                                <td>{record.date_payed}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No records found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="table-button-div">
                <button>New</button>
                <button>Back</button>
            </div>
        </div>
    );
}

export default ViewRecords;
