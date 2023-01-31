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

// POST: Save Entry
app.post(`${endPoint}/new`, (req, res) => {
    const entry = req.body;
    const newEntry = new Entry({
        ...entry,
    });
    console.log(newEntry);
    newEntry.save().then((result) => {
        console.log("note saved");
    });
    res.status(200).end();
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
