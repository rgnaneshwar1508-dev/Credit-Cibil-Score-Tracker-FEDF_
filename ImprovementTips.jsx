import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Navbar from "../components/Navbar";

function ImprovementTips() {
  const { scoreHistory } = useContext(UserContext);
  const latestScore = scoreHistory[scoreHistory.length - 1].score;

  // Tips based on score range
  const allTips = {
    poor: [
      { title: "Pay all overdue bills immediately", detail: "Clearing any overdue payments is the single most impactful step you can take right now." },
      { title: "Avoid applying for new loans", detail: "Multiple loan applications hurt your score. Avoid all new credit applications for at least 6 months." },
      { title: "Set up auto-pay for EMIs", detail: "Even one missed payment severely hurts your score. Set up auto-pay so you never miss a due date." },
      { title: "Contact your bank about settlements", detail: "If you have any written-off accounts, try to settle them and get a NOC from your bank." },
    ],
    average: [
      { title: "Keep credit utilization below 30%", detail: "If your credit card limit is ₹1,00,000 then try to keep your outstanding below ₹30,000." },
      { title: "Don't close old credit cards", detail: "Older credit accounts increase your average credit age which positively impacts your score." },
      { title: "Pay full outstanding — not just minimum", detail: "Paying only the minimum amount still counts as an outstanding balance and affects utilization." },
      { title: "Check your CIBIL report for errors", detail: "Many people have wrong entries in their report. Use the Dispute page to raise any errors." },
    ],
    good: [
      { title: "Maintain a healthy credit mix", detail: "Having both secured loans (home, car) and unsecured credit (cards) shows responsible credit behavior." },
      { title: "Keep old accounts active", detail: "Occasionally use old credit cards and pay the bill immediately to keep them active." },
      { title: "Limit hard enquiries", detail: "Each loan application triggers a hard enquiry. Apply for credit only when necessary." },
      { title: "Increase your credit limit", detail: "Request a credit limit increase from your bank — this reduces your utilization ratio automatically." },
    ],
    excellent: [
      { title: "Maintain your current habits", detail: "You are already doing great! Keep paying on time and maintaining low utilization." },
      { title: "Monitor your report regularly", detail: "Check your CIBIL report every 3 months to catch any errors or fraud early." },
      { title: "Diversify your credit portfolio", detail: "A mix of different credit types shows lenders you can manage various financial products." },
      { title: "Negotiate better interest rates", detail: "With your score, you can negotiate lower interest rates on existing loans and credit cards." },
    ],
  };

  function getTips() {
    if (latestScore >= 750) return { tips: allTips.excellent, label: "Excellent", color: "#2e7d32" };
    if (latestScore >= 700) return { tips: allTips.good, label: "Good", color: "#388e3c" };
    if (latestScore >= 650) return { tips: allTips.average, label: "Average", color: "#f57c00" };
    return { tips: allTips.poor, label: "Poor", color: "#c62828" };
  }

  const { tips, label, color } = getTips();

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <h3>Score Improvement Tips</h3>
        <p className="page-subtitle">Personalized tips based on your current score</p>

        <div className="score-banner" style={{ borderLeft: `4px solid ${color}` }}>
          <p>Your current score is <strong style={{ color }}>{latestScore}</strong> — <span style={{ color }}>{label}</span></p>
          <p className="score-date">Here are tips to help you improve your CIBIL score:</p>
        </div>

        <div className="tips-grid">
          {tips.map((tip, index) => (
            <div key={index} className="tip-card">
              <div className="tip-number" style={{ background: color }}>0{index + 1}</div>
              <div>
                <p className="tip-title">{tip.title}</p>
                <p className="tip-detail">{tip.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ marginTop: "20px" }}>
          <h4>General Best Practices</h4>
          <ul className="tips-list">
            <li>Always pay your EMIs and credit card bills on or before the due date.</li>
            <li>Keep your credit utilization ratio below 30% at all times.</li>
            <li>Do not apply for multiple loans or credit cards at the same time.</li>
            <li>Maintain a healthy mix of secured and unsecured credit products.</li>
            <li>Review your CIBIL report at least once every 3 months for errors.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ImprovementTips;
