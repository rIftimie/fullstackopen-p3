import React from "react";

function Filter({ handleFilter }) {
    return (
        <>
            <form>
                <label>
                    search by name:
                    <input onChange={(e) => handleFilter(e)} type="text" />
                </label>
            </form>
        </>
    );
}

export default Filter;
