import { Outlet, Link, useLocation } from "react-router-dom";
import {
  MessageSquare,
  FileText,
  BarChart2,
  //Settings,
  BookOpen,
  Moon,
  Sun,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  useUser,   // ✅ import Clerk hook
} from "@clerk/clerk-react";
import "./DashboardLayout.css";

function DashboardLayout() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const { user } = useUser(); // ✅ get user

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">
          <BookOpen size={28} /> <span>AI Assistant</span>
        </h2>
        <nav>
          <Link
            to="chat"
            className={location.pathname.includes("chat") ? "active" : ""}
          >
            <MessageSquare size={18} /> Chat
          </Link>
          <Link
            to="notes"
            className={location.pathname.includes("notes") ? "active" : ""}
          >
            <FileText size={18} /> Notes
          </Link>
          <Link
            to="progress"
            className={location.pathname.includes("progress") ? "active" : ""}
          >
            <BarChart2 size={18} /> Progress
          </Link>
          {/* <Link
            to="settings"
            className={location.pathname.includes("settings") ? "active" : ""}
          >
            <Settings size={18} /> Settings
          </Link> */}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main">
        <header className="topbar">
          <span>
            👋 Welcome,{" "}
            <strong>{user ? user.firstName || user.username : "Guest"}</strong>
          </span>

          <div className="actions">
            {/* Dark Mode Toggle */}
            <button
              className="darkmode-btn"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Clerk Auth Controls */}
            <SignedIn>
              <UserButton />
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="login-btn">Login</button>
              </SignInButton>
            </SignedOut>
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
