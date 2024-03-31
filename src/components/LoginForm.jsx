
const LoginForm = () => {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card mt-5 text-center">
                    <div class="card-header">
                        <strong>Login Form</strong>
                    </div>
                        <div className="p-3 text-start">
                            <label>Your Email Address</label>
                            <input type="email" name="email" className="form-control mt-3" />
                            <button type="submit" className="btn btn-primary form-control mt-3">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;