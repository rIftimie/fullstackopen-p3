import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
app.use(bodyParser.json());

const port = 3001;

const candy = "jota12345678";

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const url = `mongodb+srv://admin:${candy}@cluster0.7dhtsjo.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const entrySchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Entry = mongoose.model("Entry", entrySchema);

const endPoint = "/api/persons";
// GET: All Entries
app.get(endPoint, (req, res) => {
    Entry.find({}).then((entries) => {
        res.json(entries);
    });
});

// GET : One Entry
app.get(`${endPoint}/:id`, (req, res, next) => {
    const id = req.params.id;
    Entry.find({ _id: id })
        .then((entry) => {
            if (!entry.length) {
                res.status(404).end();
            } else {
                res.json(entry);
            }
        })
        .catch((err) => {
            next(err);
            res.status(404).end();
        });
});

// POST: Save Entry
app.post(`${endPoint}/new`, (req, res) => {
    const entry = req.body;
    const newEntry = new Entry({
        ...entry,
    });
    newEntry.save().then((result) => {
        console.log("note saved");
    });
    res.status(200).end();
});

// DELETE: Delete Entry
app.delete(`${endPoint}/delete/:id`, (req, res) => {
    const id = req.params.id;

    Entry.findByIdAndRemove(id)
        .then((entry) => {
            if (entry === null) {
                res.status(404).end();
            } else {
                res.status(200).end();
            }
        })
        .catch((error) => {
            next(error);
        });
});

// PUT: Edit Entry
app.put(`${endPoint}/edit/:id`, (req, res, next) => {
    const id = req.params.id;

    Entry.findOneAndUpdate(
        { _id: id },
        {
            name: req.body.name,
            number: req.body.number,
        }
    )
        .then((entry) => {
            if (entry === null) {
                res.status(404).end();
            } else {
                res.status(200).end();
            }
        })
        .catch((error) => next(error));
});

// Error handling
const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    }

    next(error);
};
app.use(errorHandler);

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
