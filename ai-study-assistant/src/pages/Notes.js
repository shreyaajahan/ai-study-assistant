import { useState } from "react";
import "./Notes.css";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");

  const addNote = () => {
    if (!input.trim()) return;
    setNotes([...notes, input]);
    setInput("");
  };

  return (
    <div className="notes-page">
      <h2>📝 Notes</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write a note..."
      />
      <button onClick={addNote}>Add</button>
      <ul>
        {notes.map((note, idx) => (
          <li key={idx}>📌 {note}</li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;
