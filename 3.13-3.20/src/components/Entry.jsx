import React from "react";

function Entry({ person, handleDelete }) {
    return (
        <p>
            {person.name} - {person.number}
            <br />
            <a href={`http://localhost:3001/api/persons/${person._id}`}>show</a>
            <button onClick={() => handleDelete(person._id)}>delete</button>
        </p>
    );
}

export default Entry;
