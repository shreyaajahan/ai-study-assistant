import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      setResponse("⚠️ Error connecting to AI backend");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", textAlign: "center", fontFamily: "Arial" }}>
      <h1>🚀 AI Study Assistant</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask me something..."
        style={{
          width: "70%",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={askAI}
        style={{
          marginLeft: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "8px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Ask
      </button>

      <div style={{ marginTop: "20px", textAlign: "left", whiteSpace: "pre-wrap" }}>
        {loading ? <p>⏳ Thinking...</p> : <p>{response}</p>}
      </div>
    </div>
  );
}

export default App;
