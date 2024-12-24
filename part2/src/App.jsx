import { useState, useEffect } from "react";
import Contacts from "./components/contacts/Contacts";
import AddContacts from "./components/addContact/AddContacts";
import SearchContact from "./components/searchContact/searchContact";
import ContactService from "./services/ContactService";

import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterPerson, setFilterPersons] = useState("");

  useEffect(() => {
    ContactService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    if (
      persons.some(
        (person) =>
          person.name.toLowerCase() === event.name.trim().toLowerCase()
      )
    ) {
      if (
        !window.confirm(
          `${event.name} is already added to phonebook, replace the old number with a new one?`
        )
      )
        return;

      const person = persons.find(
        (person) =>
          person.name.trim().toLowerCase() === event.name.trim().toLowerCase()
      );
      console.log(person);

      const changedNumber = {
        ...person,
        number: event.number.trim().toUpperCase(),
      };

      console.log(changedNumber);

      ContactService.update(changedNumber.id, changedNumber)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== changedNumber.id ? person : returnedPerson
            )
          );
        })
        .catch((error) => {
          alert(
            `the contact '${event.name.trim()}' was already deleted from server`
          );
          setPersons(
            persons.filter((person) => person.id !== changedNumber.id)
          );
        });
    } else {
      const personObject = {
        id: (persons.length + 1).toString(),
        name: event.name.trim(),
        number: event.number.trim().toUpperCase(),
      };

      ContactService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
    }
  };

  const personsToShow = (event) => {
    setFilterPersons(event);
  };

  const toggleDeleteOf = (id) => {
    ContactService.deleted(id)
      .then((returnedPerson) => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => {
        alert(`the contact '${id}' was already deleted from server`);
        setPersons(persons.filter((person) => person.id !== id));
      });
  };

  return (
    <div>
      <SearchContact searchContact={personsToShow} />
      <hr />
      <AddContacts addPerson={addPerson} />
      <hr />
      <Contacts
        persons={persons}
        filterPerson={filterPerson}
        toggleDelete={toggleDeleteOf}
      />
    </div>
  );
};

export default App;
