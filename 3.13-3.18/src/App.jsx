import mongoose from "mongoose";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import EntryContainer from "./components/EntryContainer";
import { getAll, newEntry, deleteById, updateEntry } from "./services/fetch.js";

function App() {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState(null);
    const [newNumber, setNewNumber] = useState(null);
    const [filter, setFilter] = useState(null);
    const [notification, setNotification] = useState(null);

    let personsToShow = [...persons];

    // Get All Data from the database.
    useEffect(() => {
        async function fetchData() {
            const allPersons = await getAll();
            setPersons(allPersons);
        }
        fetchData();
    }, []);

    if (filter) {
        personsToShow = persons.filter((person) =>
            person.name.toLowerCase().includes(filter.toLowerCase())
        );
    }

    function handleNewName(e) {
        setNewName(e.target.value);
    }
    function handleNewNumber(e) {
        setNewNumber(e.target.value);
    }
    function handleFilter(e) {
        setFilter(e.target.value);
    }

    // Deletes Entry
    async function handleDelete(id) {
        if (window.confirm("Do you really want to delete this item?")) {
            await deleteById(id);
            setPersons(
                persons.filter((person) => (person._id !== id ? person : null))
            );

            const deletedPerson = persons.filter(
                (person) => person._id === id
            )[0];

            setNotification(deletedPerson.name + " deleted");
            setTimeout(() => {
                setNotification(null);
            }, 5000);
        }
    }

    // Form on Submit
    function handleSubmit(e) {
        e.preventDefault();
        const names = persons.map((person) => person.name);

        if (newName !== null && newNumber !== null) {
            if (names.includes(newName)) {
                if (
                    window.confirm(
                        newName +
                            " is already in the phonebook. Replace the old number with a new one?"
                    )
                ) {
                    const updatedPerson = {
                        ...persons.filter(
                            (person) => person.name === newName
                        )[0],
                        number: newNumber,
                    };
                    try {
                        updateEntry(updatedPerson);
                        setPersons(
                            persons.map((person) => {
                                if (person.name === newName) {
                                    person.number = newNumber;
                                }
                                return person;
                            })
                        );
                        // Sends Notification : Successfull
                        setNotification(`Updated number for ${newName}`);
                        setTimeout(() => {
                            setNotification(null);
                        }, 5000);
                    } catch {
                        // Sends Notification : Error
                        setNotification(
                            `Cannot update ${updatedPerson.name}, person doesnt exist.`
                        );
                        setTimeout(() => {
                            setNotification(null);
                        }, 5000);
                    }
                }
            } else {
                // Creates new Id from mongoose.
                const newId = new mongoose.Types.ObjectId();
                // Save entry server-side.
                newEntry({
                    name: newName,
                    number: newNumber,
                    _id: newId,
                });
                // Save entry client-side.
                setPersons(
                    persons.concat({
                        name: newName,
                        number: newNumber,
                        _id: newId,
                    })
                );
                // Send Notification.
                setNotification(`New person ${newName} added`);
                setTimeout(() => {
                    setNotification(null);
                }, 5000);
            }
        } else {
            window.alert("Error. Input must not be empty");
        }
    }

    return (
        <main>
            <h2>Phonebook</h2>
            {notification && <Notification message={notification} />}
            <Filter handleFilter={handleFilter} />
            <PersonForm
                handleSubmit={handleSubmit}
                handleNewName={handleNewName}
                handleNewNumber={handleNewNumber}
            />
            {persons && (
                <EntryContainer
                    persons={personsToShow}
                    handleDelete={handleDelete}
                />
            )}
        </main>
    );
}

export default App;
