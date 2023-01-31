# Exercise 2.11: The Phonebook Step6

We continue with developing the phonebook project:

-   `db/db.json` Database.
-   `services/fetch.js` All the logic for fetching.

> I've decided to not use Axios.

# Exercise 2.12: The Phonebook Step7

Added the logic for saving new persons to the phonebook with a function called `savePerson(person)`

# Exercise 2.13: The Phonebook Step8

Already created.

# Exercise 2.14: Phonebook step9

To make it possible to delete entires I've created a `deleteById(id)` function.
The function is called with a new **delete button** created on the Persons Component which gives the **person.id** as a parameter.

# Exercise 2.15\*: Phonebook step10

Added functionality for updating an entry if the name already exists in the database.
The new number will replace the old one.

This is done with a function called `updatePerson(person)` which takes the updates entry and updates the old one in the database with a **PUT** method.

To make this **SPA**, when updatePerson is called, the `personsToShow` variable updates the old entry with the new one making sure the order of the remaining entries are the same.

# Exercise 2.16: Phonebook step11

Added a `Notification` Component which is responsible for showing information about the opperations executed.

It will use a `notification` State which will be null with conditional rendering when updated with a message to show.

Added manually a notification message for every operation, with a `setTimeout` which sets the notification `null` after 5s.

# Exercise 2.17\*: Phonebook step12

This can be easily be fixed when fetching the data. We have to make sure to include a throw exception in the `fetch.js` functions if `response.ok` is false. The `updatePerson` function is now called in a **try-catch**.
