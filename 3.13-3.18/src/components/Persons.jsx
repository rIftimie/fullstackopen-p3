import React from "react";

function Persons({ persons, handleDelete }) {
    const renderNames = persons.map((person) => (
        <p key={person.name}>
            {person.name} - {person.number}
            <button onClick={() => handleDelete(person.id)}>delete</button>
        </p>
    ));
    return <>{renderNames}</>;
}

export default Persons;
