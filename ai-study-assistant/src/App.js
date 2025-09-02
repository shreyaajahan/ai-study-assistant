import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  RedirectToSignIn, // ✅ you forgot to import this earlier
} from "@clerk/clerk-react";

import Chat from "./pages/ChatAI";
import Notes from "./pages/Notes";
import Progress from "./pages/Progress";
//import Settings from "./pages/Settings";
import DashboardLayout from "./components/DashboardLayout";
import LandingPage from "./pages/LandingPage";
import BackgroundWrapper from "./components/BackgroundWrapper"; 
//import { ThemeProvider } from "./context/ThemeContext"; // ✅ added

function App() {
  return (
    
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Clerk Login Page with gradient background */}
        <Route
          path="/login"
          element={
            <BackgroundWrapper>
              <SignIn
                signUpUrl="/signup"
                afterSignInUrl="/dashboard/chat"
                afterSignUpUrl="/dashboard/chat"
              />
            </BackgroundWrapper>
          }
        />

        {/* Clerk Signup Page with gradient background */}
        <Route
          path="/signup"
          element={
            <BackgroundWrapper>
              <SignUp
                signInUrl="/login"
                afterSignInUrl="/dashboard/chat"
                afterSignUpUrl="/dashboard/chat"
              />
            </BackgroundWrapper>
          }
        />

        {/* Dashboard (protected routes) */}
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
          {/* <Route path="settings" element={<Settings />} /> */}
        </Route>

        {/* Catch-all for unauthenticated users */}
        <Route
          path="*"
          element={
            <>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
              <SignedIn>
                <Navigate to="/dashboard/chat" />
              </SignedIn>
            </>
          }
        />
      </Routes>
   
  );
}

export default App;
