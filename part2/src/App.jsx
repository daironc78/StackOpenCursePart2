import { useState, useEffect } from "react";
import Contacts from "./components/contacts/Contacts";
import AddContacts from "./components/addContact/AddContacts";
import SearchContact from "./components/searchContact/searchContact";
import axios from "axios";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterPerson, setFilterPersons] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        setPersons(response.data);
        console.log("PromiseContacts", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const addPerson = (event) => {
    console.log("addContact", event);

    if (
      persons.some(
        (person) =>
          person.name.toLowerCase() === event.name.trim().toLowerCase()
      )
    ) {
      alert(`${event.name} is already added to phonebook`);
      return;
    }

    const personObject = {
      id: persons.length + 1,
      name: event.name.trim(),
      number: event.number.trim(),
    };

    setPersons(persons.concat(personObject));
  };

  const personsToShow = (event) => {
    setFilterPersons(event);
  };

  return (
    <div>
      <SearchContact searchContact={personsToShow} />
      <hr />
      <AddContacts addPerson={addPerson} />
      <hr />
      <Contacts persons={persons} filterPerson={filterPerson} />
    </div>
  );
};

export default App;
