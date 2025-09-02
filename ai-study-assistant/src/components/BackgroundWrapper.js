// src/components/BackgroundWrapper.js
import React from "react";

const BackgroundWrapper = ({ children }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "background: linear-gradient(135deg, #141e30, #243b55)", // 💙 modern blue
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "2rem",
        color: "white",
        textAlign: "center",
      }}
    >
      {/* Header */}
      <div className="mb-4">
        <h1 className="fw-bold">🚀 AI-Powered Study Assistant</h1>
        <p className="lead opacity-75">
          Smarter learning. Instant answers. Track your progress.
        </p>
      </div>

      {/* Clerk form */}
      <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
        {children}
      </div>

      {/* Footer */}
      <footer className="text-center text-light opacity-75 mt-4">
        Made with ❤️ by SHREYAA | © 2025 Study Assistant
      </footer>
    </div>
  );
};

export default BackgroundWrapper;
