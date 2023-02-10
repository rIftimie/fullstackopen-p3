const endPoint = "http://localhost:3001/api/persons";

export async function getAll() {
    const response = await fetch(endPoint);

    if (!response.ok) throw new Error(response.statusText);

    const json = await response.json();
    return json;
}

export async function newEntry(entry) {
    const response = await fetch(`${endPoint}/new`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(entry),
    });
    if (!response.ok) {
        return Promise.reject(await response.json());
    } else {
        return response.status;
    }
}

export async function deleteById(id) {
    const response = await fetch(`${endPoint}/delete/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    } else {
        return response.status;
    }
}

export async function updateEntry(person) {
    const response = await fetch(`${endPoint}/edit/${person._id}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(person),
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    } else {
        return response.status;
    }
}
