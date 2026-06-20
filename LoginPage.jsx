import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function LoginPage() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) { setError("Please fill in all fields."); return; }
    if (!email.includes("@")) { setError("Enter a valid email."); return; }
    if (password.length < 4) { setError("Password must be at least 4 characters."); return; }

    // Special case for admin login
    if (email === "admin@cibil.com") {
      setUser({ name: "Admin", email: email });
      navigate("/admin");
      return;
    }

    setUser({ name: email.split("@")[0], email: email });
    navigate("/dashboard");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>💳 CIBIL Tracker</h2>
        <p className="auth-subtitle">Sign in to your account</p>
        <p className="auth-hint">Admin login: admin@cibil.com / 1234</p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input type="text" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="error-msg">{error}</p>}
          <button type="submit" className="btn-primary">Login</button>
        </form>
        <p className="auth-footer">Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;
