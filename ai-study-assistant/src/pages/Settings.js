import { useState, useEffect } from "react";
import "./Settings.css";

function Settings() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="settings-container">
      <h2 className="settings-title">⚙️ Settings</h2>

      <div className="settings-option">
        <label htmlFor="theme">Theme:</label>
        <select
          id="theme"
          className="settings-select"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="light">🌞 Light</option>
          <option value="dark">🌙 Dark</option>
        </select>
      </div>

      <p className="current-theme">
        Current Theme: <strong>{theme}</strong>
      </p>
    </div>
  );
}

export default Settings;
