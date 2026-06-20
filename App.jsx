import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import CheckScore from "./pages/CheckScore";
import History from "./pages/History";
import DisputeForm from "./pages/DisputeForm";
import ImprovementTips from "./pages/ImprovementTips";
import EligibilityHint from "./pages/EligibilityHint";
import Notifications from "./pages/Notifications";
import AdminPanel from "./pages/AdminPanel";
import ExportReport from "./pages/ExportReport";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const [scoreHistory, setScoreHistory] = useState([
    { month: "February 2026", score: 681, date: "27 Feb" },
    { month: "March 2026", score: 695, date: "31 Mar" },
    { month: "April 2026", score: 728, date: "28 Apr" },
    { month: "May 2026", score: 742, date: "29 May" },
  ]);

  const [disputes, setDisputes] = useState([]);

  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your score improved by 14 points in April!", read: false },
    { id: 2, message: "New loan eligibility unlocked — score above 720.", read: false },
    { id: 3, message: "Tip: Reduce credit utilization below 30% for better score.", read: true },
  ]);

  // All users list for admin panel
  const [allUsers, setAllUsers] = useState([
    { id: 1, name: "Ravi Kumar", email: "ravi@gmail.com", score: 742, joined: "Jan 2026" },
    { id: 2, name: "Priya Sharma", email: "priya@gmail.com", score: 695, joined: "Feb 2026" },
    { id: 3, name: "Ankit Rao", email: "ankit@gmail.com", score: 610, joined: "Mar 2026" },
    { id: 4, name: "Sneha Nair", email: "sneha@gmail.com", score: 780, joined: "Apr 2026" },
  ]);

  const isAdmin = user?.email === "admin@cibil.com";

  return (
    <UserContext.Provider value={{ user, setUser, scoreHistory, setScoreHistory, disputes, setDisputes, notifications, setNotifications, allUsers, isAdmin }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/check-score" element={user ? <CheckScore /> : <Navigate to="/" />} />
          <Route path="/history" element={user ? <History /> : <Navigate to="/" />} />
          <Route path="/dispute" element={user ? <DisputeForm /> : <Navigate to="/" />} />
          <Route path="/tips" element={user ? <ImprovementTips /> : <Navigate to="/" />} />
          <Route path="/eligibility" element={user ? <EligibilityHint /> : <Navigate to="/" />} />
          <Route path="/notifications" element={user ? <Notifications /> : <Navigate to="/" />} />
          <Route path="/admin" element={isAdmin ? <AdminPanel /> : <Navigate to="/dashboard" />} />
          <Route path="/export" element={user ? <ExportReport /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
