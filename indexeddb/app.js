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

    // Runs only once. If it's necessary to update the database, it may be deleted
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

    form.onsubmit = addData;
    function addData(event) {
        event.preventDefault();

        // Creates a transaction for the adding proccess (everything happens inside a transaction on IndexedDB)
        let transaction = db.transaction(['contacts'], 'readwrite');
        // Creates an object store that holds the contacts
        let objectStore = transaction.objectStore('contacts');
        // Adds the object to DB
        let request = objectStore.add({
            name: nameInput.value,
            email: emailInput.value
        });

        request.onsuccess = () => {
            nameInput.value = "";
            emailInput.value = "";
        };

        transaction.oncomplete = () => {
            console.log("Transaction completed with success. Data stored on IndexedDB");
        };

        transaction.onerror = errors => {
            console.log("Transaction not completed. There are one ore more errors. ", errors);
        }
    }
}
