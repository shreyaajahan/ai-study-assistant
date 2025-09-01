import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  RedirectToSignIn,
} from "@clerk/clerk-react";

import Chat from "./pages/ChatAI";
import Notes from "./pages/Notes";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";
import DashboardLayout from "./components/DashboardLayout";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Clerk Login Page (centered) */}
      <Route
        path="/login"
        element={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <SignIn
              signUpUrl="/signup"
              afterSignInUrl="/dashboard/chat"
              afterSignUpUrl="/dashboard/chat"
            />
          </div>
        }
      />

      {/* Clerk Signup Page (centered) */}
      <Route
        path="/signup"
        element={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <SignUp
              signInUrl="/login"
              afterSignInUrl="/dashboard/chat"
              afterSignUpUrl="/dashboard/chat"
            />
          </div>
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
        <Route path="settings" element={<Settings />} />
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


















// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
// import Chat from "./pages/ChatAI";
// import Notes from "./pages/Notes";
// import Progress from "./pages/Progress";
// import Settings from "./pages/Settings";
// import DashboardLayout from "./components/DashboardLayout";
// import LandingPage from "./pages/LandingPage"; // ✅ your new landing page

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Landing Page (default root) */}
//         <Route path="/" element={<LandingPage />} />

//         {/* Login page → Clerk’s sign-in flow directly */}
//         <Route
//           path="/login"
//           element={
//             <SignedOut>
//               <RedirectToSignIn redirectUrl="/dashboard/chat" />
//             </SignedOut>
//           }
//         />

//         {/* Dashboard (protected) */}
//         <Route
//           path="/dashboard"
//           element={
//             <SignedIn>
//               <DashboardLayout />
//             </SignedIn>
//           }
//         >
//           <Route path="chat" element={<Chat />} />
//           <Route path="notes" element={<Notes />} />
//           <Route path="progress" element={<Progress />} />
//           <Route path="settings" element={<Settings />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;
