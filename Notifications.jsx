import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Navbar from "../components/Navbar";

function Notifications() {
  const { notifications, setNotifications } = useContext(UserContext);

  function markAsRead(id) {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  function markAllRead() {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  }

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <div className="page-header">
          <div>
            <h3>Notifications</h3>
            <p className="page-subtitle">Updates about your score and account</p>
          </div>
          <button className="btn-secondary" onClick={markAllRead}>Mark all as read</button>
        </div>

        <div className="history-list">
          {notifications.map((n) => (
            <div key={n.id} className={"notif-item" + (n.read ? "" : " unread")} onClick={() => markAsRead(n.id)}>
              <span className="notif-dot" style={{ visibility: n.read ? "hidden" : "visible" }}></span>
              <p className="notif-text">{n.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
