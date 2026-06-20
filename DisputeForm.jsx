import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Navbar from "../components/Navbar";

function DisputeForm() {
  const { disputes, setDisputes } = useContext(UserContext);

  const [formData, setFormData] = useState({ type: "", account: "", description: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.type || !formData.account || !formData.description) {
      setError("Please fill in all fields."); return;
    }
    const newDispute = {
      id: disputes.length + 1,
      type: formData.type,
      account: formData.account,
      description: formData.description,
      status: "Pending",
      date: new Date().toLocaleDateString("en-IN"),
    };
    setDisputes([...disputes, newDispute]);
    setFormData({ type: "", account: "", description: "" });
    setError("");
    setSuccess("Dispute submitted successfully! We will review it within 7 working days.");
  }

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <h3>Dispute an Error</h3>
        <p className="page-subtitle">Found an incorrect entry in your CIBIL report? Raise a dispute here.</p>

        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Dispute Type</label>
              <select name="type" value={formData.type} onChange={handleChange} className="form-select">
                <option value="">Select dispute type</option>
                <option value="Wrong Account">Wrong Account Listed</option>
                <option value="Incorrect Balance">Incorrect Balance Shown</option>
                <option value="Wrong Payment Status">Wrong Payment Status</option>
                <option value="Identity Theft">Identity Theft / Fraud</option>
                <option value="Closed Account">Closed Account Shown as Open</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Account / Loan Number</label>
              <input type="text" name="account" placeholder="Enter account or loan number" value={formData.account} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea name="description" placeholder="Describe the error in detail..." value={formData.description} onChange={handleChange} className="form-textarea" rows={4}></textarea>
            </div>
            {error && <p className="error-msg">{error}</p>}
            {success && <p className="success-msg">{success}</p>}
            <button type="submit" className="btn-primary">Submit Dispute</button>
          </form>
        </div>

        {/* Show submitted disputes */}
        {disputes.length > 0 && (
          <div style={{ marginTop: "24px" }}>
            <h4 style={{ marginBottom: "12px", color: "#333" }}>Your Disputes</h4>
            <div className="history-list">
              {[...disputes].reverse().map((d) => (
                <div key={d.id} className="history-item">
                  <div>
                    <p className="history-month">{d.type}</p>
                    <p className="history-date">Account: {d.account} &nbsp;|&nbsp; {d.date}</p>
                    <p className="history-date">{d.description}</p>
                  </div>
                  <span className={d.status === "Resolved" ? "badge-green" : "badge-orange"}>{d.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DisputeForm;
