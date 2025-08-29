import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";        
import Chat from "./pages/ChatAI";          
import Notes from "./pages/Notes";        
import Progress from "./pages/Progress";  
import Settings from "./pages/Settings";  
import DashboardLayout from "./components/DashboardLayout";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard/chat" : "/login"} />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard (protected) */}
        {isLoggedIn ? (
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="chat" element={<Chat />} />
            <Route path="notes" element={<Notes />} />
            <Route path="progress" element={<Progress />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        ) : (
          <Route path="/dashboard/*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
