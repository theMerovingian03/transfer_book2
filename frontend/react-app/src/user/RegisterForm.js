const RegisterForm = () => {
    return (
        <div className="main-content">
            <div className="formContainer">
                <h3>Sign-Up</h3>
                <label htmlFor="email">Name</label><br />
                <input type="email" required /><br />
                <label htmlFor="email">Valid E-mail ID</label><br />
                <input type="email" required /><br />
                <label htmlFor="password">Password</label><br />
                <input type="password" required />
                <button type="submit">Submit</button>
            </div>
        </div>
    );
}

export default RegisterForm;