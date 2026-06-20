import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Navbar from "../components/Navbar";

function CheckScore() {
  const { setScoreHistory } = useContext(UserContext);
  const [formData, setFormData] = useState({ fullName: "", pan: "", dob: "", mobile: "", income: "" });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.fullName || !formData.pan || !formData.dob || !formData.mobile || !formData.income) {
      setError("Please fill in all fields."); return;
    }
    if (formData.pan.length !== 10) { setError("PAN number must be 10 characters."); return; }
    if (formData.mobile.length !== 10) { setError("Mobile number must be 10 digits."); return; }
    setError("");

    const newScore = Math.floor(Math.random() * 200) + 650;
    const today = new Date();
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    setScoreHistory((prev) => [...prev, {
      month: monthNames[today.getMonth()] + " " + today.getFullYear(),
      score: newScore,
      date: today.getDate() + " " + months[today.getMonth()],
    }]);
    setResult(newScore);
  }

  function getLabel(score) {
    if (score >= 750) return "Excellent";
    if (score >= 700) return "Good";
    if (score >= 650) return "Average";
    return "Poor";
  }
  function getColor(score) {
    if (score >= 750) return "#2e7d32";
    if (score >= 700) return "#388e3c";
    if (score >= 650) return "#f57c00";
    return "#c62828";
  }

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <h3>Check Your Credit Score</h3>
        <p className="page-subtitle">Fill in your details to get your CIBIL score</p>
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="fullName" placeholder="Enter full name" value={formData.fullName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>PAN Number</label>
                <input type="text" name="pan" placeholder="ABCDE1234F" value={formData.pan} onChange={handleChange} maxLength={10} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Date of Birth</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <input type="text" name="mobile" placeholder="10 digit number" value={formData.mobile} onChange={handleChange} maxLength={10} />
              </div>
            </div>
            <div className="form-group">
              <label>Annual Income (₹)</label>
              <input type="number" name="income" placeholder="Enter annual income" value={formData.income} onChange={handleChange} />
            </div>
            {error && <p className="error-msg">{error}</p>}
            <button type="submit" className="btn-primary">Get Score →</button>
          </form>
          {result && (
            <div className="result-box">
              <p>Your CIBIL Score is:</p>
              <h2 style={{ color: getColor(result) }}>{result}</h2>
              <p style={{ color: getColor(result) }}>{getLabel(result)}</p>
              <p className="score-date">Score has been added to your history.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckScore;
