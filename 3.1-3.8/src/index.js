import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

let data = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];
const app = express();
app.use(bodyParser.json());
const port = 3001;

morgan.token("body", function (req, res) {
    return JSON.stringify(req.body);
});
app.use(morgan(":method" + " :body "));

// GET: All Data
app.get("/api/persons", (req, res) => {
    res.json(data);
});

// POST: New Entry
app.post("/api/persons", (req, res) => {
    const entry = req.body;
    if (entry.name != "" && entry.number != "") {
        if (!data.find((item) => item.name === entry.name)) {
            entry.id = Math.round(Math.random() * 1000);
        } else {
            throw new Error("Name must be unique");
        }
    } else {
        throw new Error("Name and Number must be specified");
    }

    data = data.concat(entry);
    res.send(data);
});

// DELETE: Delete Entry
app.delete("/api/persons/delete/:id", (req, res) => {
    const id = Number(req.params.id);

    data = data.filter((item) => item.id !== id);

    res.status(204).end();
});

// GET: Get one Entry by Id
app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);

    const entry = data.find((item) => item.id === id);

    entry ? res.json(entry) : res.status(404).end();
});

// GET: Info
app.get("/info", (req, res) => {
    const now = new Date();
    res.send(
        "Phonebook has info for " +
            data.length +
            " people. </br>" +
            now.toString()
    );
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
