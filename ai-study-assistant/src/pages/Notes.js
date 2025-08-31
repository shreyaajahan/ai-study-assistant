"use client";
import { useEffect, useState } from "react";
import "./Notes.css";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);

  // Load current user from storage
  useEffect(() => {
    const u = localStorage.getItem("currentUser"); // e.g. "sri" or "john"
    setUser(u);
  }, []);

  // Load notes for this user
  useEffect(() => {
    if (!user) return;
    const saved = localStorage.getItem(`notes_${user}`);
    if (saved) setNotes(JSON.parse(saved));
  }, [user]);

  // Save notes for this user
  useEffect(() => {
    if (user) {
      localStorage.setItem(`notes_${user}`, JSON.stringify(notes));
    }
  }, [notes, user]);

  const addNote = () => {
    if (!input.trim() || !user) return;
    setNotes([...notes, input]);
    setInput("");
  };

  const deleteNote = (i) => {
    setNotes(notes.filter((_, idx) => idx !== i));
  };

  return (
    <div className="notes-container">
      <h2 className="notes-title">📝 {user ? `${user}'s Notes` : "Notes"}</h2>

      {!user ? (
        <p>Please login to manage your notes.</p>
      ) : (
        <>
          <div className="input-section">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write a note..."
              className="note-input"
            />
            <button onClick={addNote} className="add-btn">➕ Add</button>
          </div>

          {notes.length === 0 ? (
            <p className="empty-text">No notes yet. Start writing!</p>
          ) : (
            <ul className="notes-list">
              {notes.map((note, idx) => (
                <li key={idx} className="note-item">
                  <span>📌 {note}</span>
                  <button
                    className="delete-btn"
                    onClick={() => deleteNote(idx)}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default Notes;
