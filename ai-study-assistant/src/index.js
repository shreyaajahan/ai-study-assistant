import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";

// Get your publishable key from .env
const clerkPublishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ClerkProvider
    publishableKey={clerkPublishableKey}  // ✅ required
    navigate={(to) => window.history.pushState(null, "", to)}
  >
    <App />
  </ClerkProvider>
);







// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { ClerkProvider } from '@clerk/clerk-react';

// const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
// const clerkFrontendApi = process.env.REACT_APP_CLERK_FRONTEND_API;

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <ClerkProvider publishableKey={clerkPubKey}>
//       <App />
//     </ClerkProvider>
//   </React.StrictMode>
// );

// reportWebVitals();
