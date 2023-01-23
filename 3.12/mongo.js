import mongoose from "mongoose";

let valid = false;
let showAll = false;

if (process.argv.length === 3 || process.argv.length === 5) {
    valid = true;
} else {
    console.log("arguments error");
}
if (valid) {
    const password = process.argv[2];
    const url = `mongodb+srv://admin:${password}@cluster0.7dhtsjo.mongodb.net/phonebook?retryWrites=true&w=majority`;

    mongoose.set("strictQuery", false);
    mongoose.connect(url);

    const phonebookSchema = new mongoose.Schema({
        name: String,
        number: String,
    });

    const Entry = mongoose.model("Entry", phonebookSchema);

    if (process.argv.length === 3) {
        console.log("phonebook:");

        Entry.find({}).then((result) => {
            result.forEach((item) => {
                console.log(item.name + " " + item.number);
            });
            mongoose.connection.close();
        });
    } else if (process.argv.length === 5) {
        const entry = new Entry({
            name: process.argv[3],
            number: process.argv[4],
        });

        entry.save().then((result) => {
            console.log(
                "added " +
                    process.argv[3] +
                    " number " +
                    process.argv[4] +
                    " to phonebook"
            );

            mongoose.connection.close();
        });
    }
}
