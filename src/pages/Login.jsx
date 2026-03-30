import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="window-frame form-frame">
      <div className="page-title-bar">SuDONKu - <span>Log In</span></div>
      <div className="window-body">
        <h3 className="form-heading">Welcome back</h3>
        <p className="form-subheading">Enter your credentials to continue.</p>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Enter your username" autoComplete="username" />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" autoComplete="current-password" />
        </div>

        <button className="btn form-submit">Log In</button>

        <p className="form-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;