const Notes = ({ note, toggleImportance }) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <li className="note" onClick={toggleImportance}>
      {note.content} - <strong>{label}</strong>
    </li>
  );
};

export default Notes;
