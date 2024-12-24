import { useState, useEffect } from "react";
import Contacts from "./components/contacts/Contacts";
import AddContacts from "./components/addContact/AddContacts";
import SearchContact from "./components/searchContact/searchContact";
import ContactService from "./services/ContactService";
import Notification from "./components/notification/Notification";

import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterPerson, setFilterPersons] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [statusMessage, setStatusMessage] = useState(true);

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

      const changedNumber = {
        ...person,
        number: event.number.trim().toUpperCase(),
      };

      ContactService.update(changedNumber.id, changedNumber)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== changedNumber.id ? person : returnedPerson
            )
          );
          messageShow({
            message: `Updated ${returnedPerson.name}`,
            status: true,
          });
        })
        .catch((error) => {
          setPersons(
            persons.filter((person) => person.id !== changedNumber.id)
          );
          messageShow({
            message: `the contact '${event.name.trim()}' was already deleted from server`,
            status: false,
          });
        });
    } else {
      const personObject = {
        id: (persons.length + 1).toString(),
        name: event.name.trim(),
        number: event.number.trim().toUpperCase(),
      };

      ContactService.create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          messageShow({
            message: `Added ${returnedPerson.name}`,
            status: true,
          });
        })
        .catch((error) => {
          messageShow({
            message: `Create failed for ${event.name.trim()}`,
            status: false,
          });
          setPersons(persons);
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
        messageShow({
          message: "Deleted",
          status: true,
        });
      })
      .catch((error) => {
        messageShow({
          message: `the contact '${id}' was already deleted from server`,
          status: false,
        });
        setPersons(persons.filter((person) => person.id !== id));
      });
  };

  const messageShow = ({ message, status }) => {
    setErrorMessage(message);
    setStatusMessage(status);

    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  return (
    <div>
      <div>
        <h2>Phonebook</h2>
        <Notification message={errorMessage} status={statusMessage} />
      </div>
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
