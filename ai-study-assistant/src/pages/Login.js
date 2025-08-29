import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      localStorage.setItem("user", username);
      localStorage.setItem("isLoggedIn", "true");   // ✅ make sure we set this
      navigate("/dashboard/chat");                  // ✅ go to dashboard
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>🔑 Login</h2>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
