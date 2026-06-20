import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Navbar from "../components/Navbar";

function EligibilityHint() {
  const { scoreHistory } = useContext(UserContext);
  const score = scoreHistory[scoreHistory.length - 1].score;

  const products = [
    { name: "Premium Credit Card", minScore: 750, interest: "12% p.a.", limit: "Up to ₹5,00,000", icon: "💳" },
    { name: "Home Loan", minScore: 700, interest: "8.5% p.a.", limit: "Up to ₹1 Crore", icon: "🏠" },
    { name: "Personal Loan", minScore: 680, interest: "12-14% p.a.", limit: "Up to ₹10,00,000", icon: "💰" },
    { name: "Car Loan", minScore: 670, interest: "9.5% p.a.", limit: "Up to ₹20,00,000", icon: "🚗" },
    { name: "Education Loan", minScore: 650, interest: "10% p.a.", limit: "Up to ₹20,00,000", icon: "🎓" },
    { name: "Basic Credit Card", minScore: 600, interest: "36% p.a.", limit: "Up to ₹50,000", icon: "💳" },
    { name: "Gold Loan", minScore: 550, interest: "11% p.a.", limit: "Up to ₹5,00,000", icon: "🥇" },
    { name: "Secured Credit Card", minScore: 0, interest: "24% p.a.", limit: "Up to ₹25,000", icon: "🔒" },
  ];

  const eligible = products.filter((p) => score >= p.minScore);
  const notEligible = products.filter((p) => score < p.minScore);

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <h3>Loan & Card Eligibility</h3>
        <p className="page-subtitle">Products you are eligible for based on your CIBIL score of {score}</p>

        <h4 style={{ marginBottom: "12px", color: "#2e7d32" }}>✅ You are Eligible For</h4>
        <div className="eligibility-grid">
          {eligible.map((p, i) => (
            <div key={i} className="eligibility-card eligible">
              <div className="eli-icon">{p.icon}</div>
              <div>
                <p className="eli-name">{p.name}</p>
                <p className="eli-detail">Interest: {p.interest}</p>
                <p className="eli-detail">Limit: {p.limit}</p>
                <p className="eli-detail">Min Score Required: {p.minScore === 0 ? "No minimum" : p.minScore}</p>
              </div>
            </div>
          ))}
        </div>

        {notEligible.length > 0 && (
          <>
            <h4 style={{ marginBottom: "12px", color: "#c62828", marginTop: "24px" }}>❌ Not Yet Eligible For</h4>
            <div className="eligibility-grid">
              {notEligible.map((p, i) => (
                <div key={i} className="eligibility-card not-eligible">
                  <div className="eli-icon" style={{ opacity: 0.4 }}>{p.icon}</div>
                  <div>
                    <p className="eli-name" style={{ color: "#999" }}>{p.name}</p>
                    <p className="eli-detail">Min Score Required: {p.minScore}</p>
                    <p className="eli-detail" style={{ color: "#c62828" }}>You need {p.minScore - score} more points</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EligibilityHint;
