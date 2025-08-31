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
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    background: "#f9f9f9",
    borderRadius: "10px",
  },
  header: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  chatBox: {
    flex: 1,
    overflowY: "auto",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    background: "#fff",
    marginBottom: "10px",
  },
  userMessage: {
    textAlign: "right",
    margin: "5px 0",
    padding: "8px",
    background: "#d1e7dd",
    borderRadius: "8px",
    display: "inline-block",
  },
  aiMessage: {
    textAlign: "left",
    margin: "5px 0",
    padding: "8px",
    background: "#f8d7da",
    borderRadius: "8px",
    display: "inline-block",
  },
  inputBox: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "5px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default ChatAI;
