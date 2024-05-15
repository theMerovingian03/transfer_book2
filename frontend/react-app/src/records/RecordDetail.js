const RecordDetail = () => {
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
                    <td>Car Wash</td>
                </tr>
                <tr>
                    <td>Amount</td>
                    <td>50</td>
                </tr>
                <tr>
                    <td>Type</td>
                    <td>Debit</td>
                </tr>
                <tr>
                    <td>Date Payed</td>
                    <td>dd:mm:yyyy</td>
                </tr>
                <tr>
                    <td>Date Added</td>
                    <td>dd:mm:yyyy</td>
                </tr>
            </table>
            <div className="table-button-div">
                <button>New</button>
                <button>Edit</button>
                <button>Delete</button>
                <button>Back</button>
            </div>
        </div>
    );
}

export default RecordDetail;