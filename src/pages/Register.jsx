import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="window-frame form-frame">
      <div className="page-title-bar">SuDONKu - <span>Register</span></div>
      <div className="window-body">
        <h3 className="form-heading">Join SuDONKu</h3>
        <p className="form-subheading">Sign up to track your scores and compete on the leaderboard.</p>

        <div className="form-group">
          <label htmlFor="reg-username">Username</label>
          <input type="text" id="reg-username" placeholder="Choose a username" autoComplete="username" />
        </div>

        <div className="form-group">
          <label htmlFor="reg-password">Password</label>
          <input type="password" id="reg-password" placeholder="Create a password" autoComplete="new-password" />
        </div>

        <div className="form-group">
          <label htmlFor="reg-confirm">Confirm Password</label>
          <input type="password" id="reg-confirm" placeholder="Re-enter your password" autoComplete="new-password" />
        </div>

        <button className="btn form-submit">Create Account</button>

        <p className="form-footer">
          Already have an account? <Link to="/login">Log in here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;