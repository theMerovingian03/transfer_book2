import { useState, useEffect } from 'react';
import BASE_URL from '../config';
// hi
const ViewRecords = () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const fetchRecords = async () => {
            const token = localStorage.getItem('token');
            console.log(token);

            if (!token) {
                console.error('No token found');
                return;
            }

            try {
                const response = await fetch(`${BASE_URL}/api/records/`, { // Ensure there is a slash between BASE_URL and /api/records
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });

                console.log(response);

                if (response.ok) {
                    const data = await response.json();
                    setRecords(data);
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
