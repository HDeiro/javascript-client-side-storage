let db;
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const form = document.querySelector("form");
const submitButton = document.querySelector("#addContact");

window.onload = () => {
    let request = window.indexedDB.open('contacts', 1); //Database contacts version 1

    // Runs when the connection does not open with success
    request.onerror = () => console.log("Database failed to open");

    // Runs when the connection is opened on success
    request.onsuccess = () => {
        console.log("Database opened succesfully the connection");
        db = request.result;
    }

    // Runs only once
    request.onupgradeneeded = e => {
        let db = e.target.result;
        let objectStore = db.createObjectStore('contacts', {
            keyPath: 'id',
            autoIncrement: true
        });

        objectStore.createIndex('name', 'name', {unique: false});
        objectStore.createIndex('email', 'email', {unique: true});

        console.log("Database setup is complete");
    }
}
