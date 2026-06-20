import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Navbar from "../components/Navbar";

function getScoreInfo(score) {
  if (score >= 750) return { label: "Excellent", color: "#2e7d32" };
  if (score >= 700) return { label: "Good", color: "#388e3c" };
  if (score >= 650) return { label: "Average", color: "#f57c00" };
  return { label: "Poor", color: "#c62828" };
}

function Dashboard() {
  const { user, scoreHistory } = useContext(UserContext);
  const latestScore = scoreHistory[scoreHistory.length - 1];
  const scoreInfo = getScoreInfo(latestScore.score);

  const factors = [
    { name: "Payment History", percent: 82, color: "#2e7d32" },
    { name: "Credit Utilization", percent: 45, color: "#f57c00" },
    { name: "Age of Credit", percent: 60, color: "#2e7d32" },
    { name: "New Enquiries", percent: 25, color: "#c62828" },
  ];

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <h3>Welcome back, {user?.name} 👋</h3>
        <p className="page-subtitle">Here is your credit score overview</p>

        <div className="score-card">
          <div className="score-ring" style={{ borderColor: scoreInfo.color }}>
            <span className="score-number">{latestScore.score}</span>
            <span className="score-out">/ 900</span>
          </div>
          <span className="score-badge" style={{ color: scoreInfo.color }}>{scoreInfo.label}</span>
          <p className="score-date">Last updated: {latestScore.date} {latestScore.month}</p>
        </div>

        <div className="stats-row">
          <div className="stat-box"><p className="stat-value">82%</p><p className="stat-label">Payment History</p></div>
          <div className="stat-box"><p className="stat-value">3</p><p className="stat-label">Active Loans</p></div>
          <div className="stat-box"><p className="stat-value">₹2.1L</p><p className="stat-label">Credit Limit</p></div>
          <div className="stat-box"><p className="stat-value">5 yrs</p><p className="stat-label">Credit Age</p></div>
        </div>

        <div className="two-col">
          <div className="card">
            <h4>Score Factors</h4>
            {factors.map((f) => (
              <div key={f.name} className="factor-row">
                <span className="factor-label">{f.name}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: f.percent + "%", backgroundColor: f.color }}></div>
                </div>
                <span className="factor-percent">{f.percent}%</span>
              </div>
            ))}
          </div>

          <div className="card">
            <h4>Score Trend (6 months)</h4>
            <div className="trend-chart">
              {scoreHistory.map((item, index) => {
                const height = ((item.score - 600) / 300) * 100;
                return (
                  <div key={index} className="trend-col">
                    <span className="trend-score">{item.score}</span>
                    <div className="trend-bar" style={{ height: height + "px", backgroundColor: getScoreInfo(item.score).color }}></div>
                    <span className="trend-month">{item.month.split(" ")[0].slice(0, 3)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
