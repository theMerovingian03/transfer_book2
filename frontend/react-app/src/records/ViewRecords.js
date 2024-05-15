const ViewRecords = () => {
    return (
        <div className="table-div">
            <h3>Record History</h3>
            <table className="table1">
                <tr>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Date Added</th>
                    <th>Date Paid</th>
                </tr>
                <tr>
                    <td>Car Wash</td>
                    <td>100</td>
                    <td>Debit</td>
                    <td>dd:mm:yyyy</td>
                    <td>dd:mm:yyyy</td>
                </tr>
                <tr>
                    <td>Groceries</td>
                    <td>70</td>
                    <td>Debit</td>
                    <td>dd:mm:yyyy</td>
                    <td>dd:mm:yyyy</td>
                </tr>
                <tr>
                    <td>Salary</td>
                    <td>100000</td>
                    <td>Credit</td>
                    <td>dd:mm:yyyy</td>
                    <td>dd:mm:yyyy</td>
                </tr>
            </table>
            <div className="table-button-div">
                <button>New</button>
                <button>Back</button>
            </div>
        </div>
    );
}

export default ViewRecords;
