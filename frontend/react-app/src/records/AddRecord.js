import { useState } from 'react';
import BASE_URL from '../config';

const AddRecord = () => {
    const [title, setTitle] = useState('');
    const [transactionType, setTransactionType] = useState('debit');
    const [amount, setAmount] = useState('');
    const [dateAdded, setDateAdded] = useState('');
    const [datePayed, setDatePayed] = useState('');

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
            };

            if (dateAdded) {
                recordData.date_added = dateAdded;
            }

            if (datePayed) {
                recordData.date_payed = datePayed;
            }

            const response = await fetch(`${BASE_URL}/api/records/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(recordData)
            });
            console.log(response.headers)

            if (response.ok) {
                // Record added successfully
                // You can redirect or show a success message here
                console.log('Record added successfully');
            } else {
                console.error('Failed to add record');
            }
        } catch (error) {
            console.error('An error occurred while adding record:', error);
        }
    };

    return (
        <div className="main-content">
            <div className="formContainer">
                <h3>Add a new Transaction</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Title</label><br />
                    <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
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
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddRecord;
