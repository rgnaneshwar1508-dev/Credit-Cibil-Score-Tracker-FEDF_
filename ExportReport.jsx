import { useContext, useRef } from "react";
import { UserContext } from "../context/UserContext";
import Navbar from "../components/Navbar";

function ExportReport() {
  const { user, scoreHistory } = useContext(UserContext);
  const latestScore = scoreHistory[scoreHistory.length - 1];

  // Export score history as a CSV file
  function exportCSV() {
    let csv = "Month,Score,Date Checked\n";
    scoreHistory.forEach((item) => {
      csv += `${item.month},${item.score},${item.date}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "cibil_score_history.csv";
    link.click();
    window.URL.revokeObjectURL(url);
  }

  // Export a simple text-based report (acts as our PDF-like report)
  function exportReport() {
    let content = "===========================================\n";
    content += "         CIBIL CREDIT SCORE REPORT\n";
    content += "===========================================\n\n";
    content += `Name: ${user?.name}\n`;
    content += `Email: ${user?.email}\n`;
    content += `Report Generated: ${new Date().toLocaleDateString("en-IN")}\n\n`;
    content += `Current Score: ${latestScore.score} / 900\n`;
    content += `Last Updated: ${latestScore.date} ${latestScore.month}\n\n`;
    content += "-------------------------------------------\n";
    content += "SCORE HISTORY\n";
    content += "-------------------------------------------\n";
    scoreHistory.forEach((item) => {
      content += `${item.month.padEnd(20)} : ${item.score}\n`;
    });
    content += "\n===========================================\n";
    content += "This is a system generated report.\n";

    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "cibil_report.txt";
    link.click();
    window.URL.revokeObjectURL(url);
  }

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <h3>Export Your Report</h3>
        <p className="page-subtitle">Download your credit score data for your records</p>

        <div className="export-grid">
          <div className="card export-card">
            <div className="export-icon">📄</div>
            <p className="tip-title">Full Score Report</p>
            <p className="tip-detail">Download a complete summary report including your current score and full history.</p>
            <button className="btn-primary" style={{ marginTop: "12px" }} onClick={exportReport}>Download Report (.txt)</button>
          </div>

          <div className="card export-card">
            <div className="export-icon">📊</div>
            <p className="tip-title">Score History (CSV)</p>
            <p className="tip-detail">Download your month-wise score history as a CSV file to open in Excel.</p>
            <button className="btn-primary" style={{ marginTop: "12px" }} onClick={exportCSV}>Download CSV</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExportReport;
