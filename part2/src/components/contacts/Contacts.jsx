const Contacts = ({ persons, filterPerson, toggleDelete }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ol>
        {persons
          .filter((person) =>
            person.name.toLowerCase().includes(filterPerson.toLowerCase())
          )
          .map((filteredPerson) => (
            <li key={filteredPerson.id}>
              {filteredPerson.name} - {filteredPerson.number} -{" "}
              <button onClick={() => toggleDelete(filteredPerson.id)}>
                Delete
              </button>
            </li>
          ))}
      </ol>
    </div>
  );
};

export default Contacts;
