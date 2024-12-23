import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/notes/Notes";
import "./App.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const hook = () => {
    axios.get("http://localhost:3001/notes").then((response) => {
      setNotes(response.data);
    });
  };

  useEffect(hook, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };

    setNotes(notes.concat(noteObject));
    setNewNote("");
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  return (
    <div>
      <h1>Notes</h1>

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ol>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ol>
      <form onSubmit={addNote}>
        <div>
          <input
            type="text"
            value={newNote}
            onChange={handleNoteChange}
            placeholder="A new note..."
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
