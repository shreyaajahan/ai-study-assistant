import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { MessageSquare, FileText, BarChart2, Settings, LogOut, BookOpen, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import "./DashboardLayout.css";

function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem("user");

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // Apply dark mode when state changes
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">
          <BookOpen size={28} /> <span>AI Assistant</span>
        </h2>
        <nav>
          <Link to="chat" className={location.pathname.includes("chat") ? "active" : ""}>
            <MessageSquare size={18} /> Chat
          </Link>
          <Link to="notes" className={location.pathname.includes("notes") ? "active" : ""}>
            <FileText size={18} /> Notes
          </Link>
          <Link to="progress" className={location.pathname.includes("progress") ? "active" : ""}>
            <BarChart2 size={18} /> Progress
          </Link>
          <Link to="settings" className={location.pathname.includes("settings") ? "active" : ""}>
            <Settings size={18} /> Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main">
        <header className="topbar">
          <span>
            👋 Welcome, <strong>{username || "Student"}</strong>
          </span>

          <div className="actions">
            {/* Dark Mode Toggle */}
            <button className="darkmode-btn" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Logout */}
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={18} /> Logout
            </button>
          </div>
        </header>

        <div className="content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
