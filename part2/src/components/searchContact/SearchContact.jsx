const SearchContact = ({ searchContact }) => {
    return (
        <div>
            <h2>Phonebook</h2>
            <input placeholder="Search contact" onChange={(event) => { searchContact(event.target.value) }} />
        </div>
    );
}

export default SearchContact;