import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../config';

const AddRecord = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [transactionType, setTransactionType] = useState('debit');
    const [amount, setAmount] = useState('');
    const [dateAdded, setDateAdded] = useState('');
    const [datePayed, setDatePayed] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (id) {
            setIsEditMode(true);
            fetchRecordDetails(id);
        }
    }, [id]);

    const fetchRecordDetails = async (recordId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/api/records/${recordId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                const record = response.data;
                setTitle(record.title);
                setAmount(record.amount);
                setTransactionType(record.transaction_type);
                setDatePayed(record.date_payed);
                setDateAdded(record.date_added);
            } else {
                console.error('Failed to fetch record details', response.status);
            }
        } catch (error) {
            console.error('Error occurred while fetching record details', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            const recordData = {
                title,
                transaction_type: transactionType,
                amount: parseFloat(amount), // Convert amount to number
                date_added: dateAdded || undefined,
                date_payed: datePayed || undefined
            };

            if (isEditMode) {
                await axios.put(`${BASE_URL}/api/records/${id}/`, recordData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
            } else {
                await axios.post(`${BASE_URL}/api/records/`, recordData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
            }

            navigate('/records');
        } catch (error) {
            console.error('An error occurred while submitting the form:', error);
        }
    };

    return (
        <div className="main-content">
            <div className="formContainer">
                <h3>{isEditMode ? 'Edit Record' : 'Add a new Transaction'}</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Title</label><br />
                    <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required /><br />
                    <label htmlFor="transaction_type">Credit or Debit?</label><br />
                    <select name="transaction_type" id="transaction_type" value={transactionType} onChange={(e) => setTransactionType(e.target.value)} required>
                        <option value="credit">Credit</option>
                        <option value="debit">Debit</option>
                    </select><br />
                    <label htmlFor="amount">Enter Amount</label><br />
                    <input type="number" name="amount" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required /><br />
                    <label htmlFor="date_added">Date Added (optional)</label><br />
                    <input type="date" name="date_added" id="date_added" value={dateAdded} onChange={(e) => setDateAdded(e.target.value)} /><br />
                    <label htmlFor="date_payed">Date Paid (optional)</label><br />
                    <input type="date" name="date_payed" id="date_payed" value={datePayed} onChange={(e) => setDatePayed(e.target.value)} /><br />
                    <button type="submit">{isEditMode ? 'Save changes' : 'Add Record'}</button>
                </form>
            </div>
        </div>
    );
};

export default AddRecord;
