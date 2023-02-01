import React from "react";

function PersonForm({ handleSubmit, handleNewName, handleNewNumber }) {
    return (
        <section>
            <h2>Add New:</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>
                    name:
                    <input
                        name="formName"
                        onChange={(e) => handleNewName(e)}
                        type="text"
                    />
                </label>
                <br />
                <label>
                    number:
                    <input
                        name="formNumber"
                        onChange={(e) => handleNewNumber(e)}
                        type="text"
                    />
                </label>
                <label>
                    <button name="formSubmit" type="submit">
                        add
                    </button>
                </label>
            </form>
        </section>
    );
}

export default PersonForm;
