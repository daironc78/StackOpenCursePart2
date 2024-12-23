import { useState } from 'react';

const AddContacts = ({ addPerson }) => {
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addPerson({ name: newName, number: newNumber });
        setNewName('');
        setNewNumber('');
    };

    return (
        <div>
            <h2>Add Contact</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} placeholder='Nombre' />
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange} placeholder='Number' />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    );
};

export default AddContacts;
