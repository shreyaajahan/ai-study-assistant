import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useUser } from "@clerk/clerk-react";

const ChatAI = () => {
  const { isSignedIn } = useUser(); // ✅ check login
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // ✅ If not logged in, block
    if (!isSignedIn) {
      setMessages([
        ...messages,
        { sender: "ai", text: "⚠️ Please login to chat" },
      ]);
      setInput("");
      return;
    }

    // Add user message
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();
      setMessages([...newMessages, { sender: "ai", text: data.response }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...newMessages,
        { sender: "ai", text: "⚠️ Something went wrong. Please try again." },
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>🤖 AI Study Assistant</div>

      <div style={styles.chatBox}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={msg.sender === "user" ? styles.userMessage : styles.aiMessage}
          >
            {msg.sender === "ai" ? (
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            ) : (
              msg.text
            )}
          </div>
        ))}
        {loading && <div style={styles.aiMessage}>AI is typing...</div>}
        <div ref={chatEndRef} />
      </div>

      <div style={styles.inputBox}>
        <input
          type="text"
          value={input}
          placeholder="Ask me anything..."
          style={styles.input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
};

// ✅ Styles object (fixes "styles is not defined" error)
// ✅ Detect system dark mode
const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    background: isDarkMode ? "#1e1e1e" : "white",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    color: isDarkMode ? "#f1f1f1" : "#333",
  },
  header: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "15px",
    textAlign: "center",
    color: isDarkMode ? "#f1f1f1" : "#333",
  },
  chatBox: {
    flex: 1,
    overflowY: "auto",
    padding: "15px",
    border: "1px solid #444",
    borderRadius: "12px",
    background: isDarkMode ? "#2a2a2a" : "#fafafa",
    marginBottom: "15px",
  },
  userMessage: {
  alignSelf: "flex-end",          // ✅ push user messages to the right
  margin: "8px 0",
  padding: "10px 14px",
  background: "#007bff",
  color: "#fff",
  borderRadius: "12px 12px 0 12px",
  maxWidth: "70%",
  wordWrap: "break-word",
},

  aiMessage: {
  alignSelf: "flex-start",        // ✅ keep AI messages on the left
  margin: "8px 0",
  padding: "10px 14px",
  background: "#f1f1f1",
  borderRadius: "12px 12px 12px 0",
  maxWidth: "70%",
  wordWrap: "break-word",
},

  inputBox: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #555",
    fontSize: "14px",
    background: isDarkMode ? "#2a2a2a" : "#fff",
    color: isDarkMode ? "#f1f1f1" : "#000",
  },
  button: {
    padding: "12px 20px",
    borderRadius: "10px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    transition: "0.2s",
  },
};


export default ChatAI;
