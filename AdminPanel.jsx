import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import Navbar from "../components/Navbar";

function AdminPanel() {
  const { allUsers, disputes, setDisputes } = useContext(UserContext);
  const [filter, setFilter] = useState("All");

  function getColor(score) {
    if (score >= 750) return "#2e7d32";
    if (score >= 700) return "#388e3c";
    if (score >= 650) return "#f57c00";
    return "#c62828";
  }

  function resolveDispute(id) {
    setDisputes(disputes.map((d) => (d.id === id ? { ...d, status: "Resolved" } : d)));
  }

  const filteredDisputes = filter === "All" ? disputes : disputes.filter((d) => d.status === filter);

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <h3>Admin Panel</h3>
        <p className="page-subtitle">Manage users and review submitted disputes</p>

        <div className="stats-row">
          <div className="stat-box"><p className="stat-value">{allUsers.length}</p><p className="stat-label">Total Users</p></div>
          <div className="stat-box"><p className="stat-value">{disputes.length}</p><p className="stat-label">Total Disputes</p></div>
          <div className="stat-box"><p className="stat-value">{disputes.filter(d => d.status === "Pending").length}</p><p className="stat-label">Pending Disputes</p></div>
          <div className="stat-box"><p className="stat-value">{Math.round(allUsers.reduce((a,u) => a + u.score, 0) / allUsers.length)}</p><p className="stat-label">Avg Score</p></div>
        </div>

        <h4 style={{ margin: "20px 0 12px", color: "#333" }}>Registered Users</h4>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr><th>#</th><th>Name</th><th>Email</th><th>Score</th><th>Joined</th></tr>
            </thead>
            <tbody>
              {allUsers.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td style={{ color: getColor(u.score), fontWeight: "bold" }}>{u.score}</td>
                  <td>{u.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h4 style={{ margin: "24px 0 12px", color: "#333" }}>Submitted Disputes</h4>
        <div className="filter-row">
          <span>Filter:</span>
          {["All", "Pending", "Resolved"].map((s) => (
            <button key={s} className={filter === s ? "filter-btn active" : "filter-btn"} onClick={() => setFilter(s)}>{s}</button>
          ))}
        </div>

        {filteredDisputes.length === 0 ? (
          <p style={{ color: "#999" }}>No disputes found.</p>
        ) : (
          <div className="history-list">
            {filteredDisputes.map((d) => (
              <div key={d.id} className="history-item">
                <div>
                  <p className="history-month">{d.type} — Account {d.account}</p>
                  <p className="history-date">{d.description}</p>
                  <p className="history-date">Submitted: {d.date}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span className={d.status === "Resolved" ? "badge-green" : "badge-orange"}>{d.status}</span>
                  {d.status === "Pending" && (
                    <div style={{ marginTop: "6px" }}>
                      <button className="action-btn approve" onClick={() => resolveDispute(d.id)}>Mark Resolved</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
