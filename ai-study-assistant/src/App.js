import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Chat from "./pages/ChatAI";
import Notes from "./pages/Notes";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";
import DashboardLayout from "./components/DashboardLayout";
import LandingPage from "./pages/LandingPage"; // ✅ your new landing page

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page (default root) */}
        <Route path="/" element={<LandingPage />} />

        {/* Login page → Clerk’s sign-in flow directly */}
        <Route
          path="/login"
          element={
            <SignedOut>
              <RedirectToSignIn redirectUrl="/dashboard/chat" />
            </SignedOut>
          }
        />

        {/* Dashboard (protected) */}
        <Route
          path="/dashboard"
          element={
            <SignedIn>
              <DashboardLayout />
            </SignedIn>
          }
        >
          <Route path="chat" element={<Chat />} />
          <Route path="notes" element={<Notes />} />
          <Route path="progress" element={<Progress />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
