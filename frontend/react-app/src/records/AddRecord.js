const AddRecord = () => {
    return (
        <div className="main-content">
            <div className="formContainer">
                <h3>Add a new Transaction</h3>
                <label htmlFor="title">Title</label><br />
                <input type="text" name="title" id="title" /><br />
                <label htmlFor="cr_o_de">Credit or Debit?</label><br />
                <select name="credOrDe" id="credOrDe" required>
                    <option value="credit">Credit</option>
                    <option value="debit" selected>Debit</option>
                </select><br />
                <label htmlFor="amount">Enter Amount</label><br />
                <input type="number" name="amount" id="amount" required /><br />
                <label htmlFor="date_of_transer">Date</label><br />
                <input type="date" name="date_of_transfer" id="date_of_transfer" required /><br />
                <button type="submit">Submit</button>
            </div>
        </div >
    );
}

export default AddRecord;