import React from "react";
import Entry from "./Entry";

function EntryContainer({ persons, handleDelete }) {
    const renderNames = persons.map((person) => (
        <Entry key={person._id} person={person} handleDelete={handleDelete} />
    ));
    return <>{renderNames}</>;
}

export default EntryContainer;
