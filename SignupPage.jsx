import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function SignupPage() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSignup(e) {
    e.preventDefault();
    if (!name || !email || !password) { setError("Please fill in all fields."); return; }
    if (!email.includes("@")) { setError("Enter a valid email."); return; }
    if (password.length < 4) { setError("Password must be at least 4 characters."); return; }
    setUser({ name, email });
    navigate("/dashboard");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>💳 CIBIL Tracker</h2>
        <p className="auth-subtitle">Create a new account</p>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="text" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="error-msg">{error}</p>}
          <button type="submit" className="btn-primary">Sign Up</button>
        </form>
        <p className="auth-footer">Already have an account? <Link to="/">Login</Link></p>
      </div>
    </div>
  );
}

export default SignupPage;
