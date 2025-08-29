import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const ChatAI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

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

  // Auto scroll to bottom
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

const styles = {
  container: {
    width: "500px",
    margin: "30px auto",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "10px",
    fontFamily: "Arial, sans-serif",
    background: "#f9f9f9",
  },
  header: {
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "10px",
  },
  chatBox: {
    height: "400px",
    overflowY: "auto",
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "8px",
    background: "white",
  },
  userMessage: {
    textAlign: "right",
    margin: "5px 0",
    padding: "8px",
    background: "#007bff",
    color: "white",
    borderRadius: "8px",
    display: "inline-block",
    maxWidth: "80%",
  },
  aiMessage: {
    textAlign: "left",
    margin: "5px 0",
    padding: "8px",
    background: "#e5e5ea",
    borderRadius: "8px",
    display: "inline-block",
    maxWidth: "80%",
  },
  inputBox: {
    display: "flex",
    marginTop: "10px",
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "8px 12px",
    marginLeft: "5px",
    border: "none",
    borderRadius: "5px",
    background: "#007bff",
    color: "white",
    cursor: "pointer",
  },
};

export default ChatAI;
