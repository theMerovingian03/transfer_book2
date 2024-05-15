const LoginForm = () => {
    return (
        <div className="main-content">
            <div className="formContainer">
                <h3>Login</h3>
                <label htmlFor="email">E-mail ID</label><br />
                <input type="email" required /><br />
                <label htmlFor="password">Password</label><br />
                <input type="password" required />
                <button type="submit">Submit</button><br />
            </div>
        </div>
    );
}

export default LoginForm