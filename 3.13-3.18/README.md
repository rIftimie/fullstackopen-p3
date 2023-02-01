# Exercise 3.13/3.14: Phonebook database Step1-2

Entries are now fetched from the database and are also added.

# Exercise 3.15: Phonebook database Step3

Added the delete functionality for the backend with the `findByIdAndRemove` function.

Modified the way the objects are added in the database:

> When creating an object an ObjectId is also created and added to both the client and server side so that you can modify the current one without the need to refresh to fetch the original database id.

# Exercise 3.16: Phonebook database Step4

Defined the error handler into middleware.

# Exercise 3.17: Phonebook database Step5

Also added the primary function to edit an entry with the `findOneAndUpdate` function.

# Exercise 3.18: Phonebook database Step6

Added a unique url for every phonebook based on the id.
