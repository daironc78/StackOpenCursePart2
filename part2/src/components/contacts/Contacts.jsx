const Contacts = ({ persons, filterPerson }) => {
    return (
        <div>
            <h2>Numbers</h2>
            <ol>
                {persons
                    .filter(person => person.name.toLowerCase().includes(filterPerson.toLowerCase()))
                    .map(filteredPerson => (
                        <li key={filteredPerson.id}>{filteredPerson.name} - {filteredPerson.number}</li>
                    ))
                }
            </ol>
        </div>
    )
}

export default Contacts
