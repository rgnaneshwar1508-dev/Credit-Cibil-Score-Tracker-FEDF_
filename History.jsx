import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Navbar from "../components/Navbar";

function History() {
  const { scoreHistory } = useContext(UserContext);

  function getColor(score) {
    if (score >= 750) return "#2e7d32";
    if (score >= 700) return "#388e3c";
    if (score >= 650) return "#f57c00";
    return "#c62828";
  }
  function getLabel(score) {
    if (score >= 750) return "Excellent";
    if (score >= 700) return "Good";
    if (score >= 650) return "Average";
    return "Poor";
  }

  const reversed = [...scoreHistory].reverse();

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <h3>Score History</h3>
        <p className="page-subtitle">Your past CIBIL score records</p>

        <div className="history-list">
          {reversed.map((item, index) => (
            <div key={index} className="history-item">
              <div>
                <p className="history-month">{item.month}</p>
                <p className="history-date">Checked on {item.date}</p>
              </div>
              <div className="history-right">
                <span className="history-score" style={{ color: getColor(item.score) }}>{item.score}</span>
                <span className="history-label" style={{ color: getColor(item.score) }}>{getLabel(item.score)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="score-legend">
          <h4>Score Range Guide</h4>
          <div className="legend-row"><span style={{ color: "#2e7d32" }}>● 750 - 900</span><span>Excellent</span></div>
          <div className="legend-row"><span style={{ color: "#388e3c" }}>● 700 - 749</span><span>Good</span></div>
          <div className="legend-row"><span style={{ color: "#f57c00" }}>● 650 - 699</span><span>Average</span></div>
          <div className="legend-row"><span style={{ color: "#c62828" }}>● Below 650</span><span>Poor</span></div>
        </div>
      </div>
    </div>
  );
}

export default History;
