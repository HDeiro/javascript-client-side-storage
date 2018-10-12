let db;
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const form = document.querySelector("form");
const submitButton = document.querySelector("#addContact");
const list = document.querySelector("ul");

window.onload = () => {
    let request = window.indexedDB.open('contacts', 1); //Database contacts version 1

    // Runs when the connection does not open with success
    request.onerror = () => console.log("Database failed to open");

    // Runs when the connection is opened on success
    request.onsuccess = () => {
        console.log("Database opened succesfully the connection");
        db = request.result;
        getAllData();
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
            getAllData();
        };

        transaction.onerror = errors => {
            console.log("Transaction not completed. There are one ore more errors. ", errors);
        }
    }

    function getAllData() {
        // Cleanup the list
        while (list.firstChild)
            list.removeChild(list.firstChild);

        // Starts to get the data
        let objectStore = db.transaction('contacts').objectStore('contacts');
       
        objectStore.openCursor().onsuccess = event => {
            let cursor = event.target.result;

            if(cursor) {
                let listItem = document.createElement("li");
                let name = document.createElement("p");
                let email = document.createElement("p");

                listItem.appendChild(name);
                listItem.appendChild(email);
                list.appendChild(listItem);

                name.textContent = cursor.value.name;
                email.textContent = cursor.value.email;
                listItem.setAttribute('data-contact-id', cursor.value.id);

                let deleteButton = document.createElement('button');
                listItem.appendChild(deleteButton);
                deleteButton.textContent = "Delete";
                deleteButton.onclick = deleteItem;
                

                // Re-execute this procedure
                cursor.continue();  
            } else {
                if(!list.firstChild) {
                    let listItem = document.createElement('li');
                    listItem.textContent = "No contacts stored";
                    list.appendChild(listItem);
                }
            }
            
            console.log("Contacts retrieved from IndexedDB");
        }
    };

    function deleteItem(e) {
        let contactId = Number(e.target.parentNode.getAttribute('data-contact-id'));
        
        let transaction = db.transaction(['contacts'], 'readwrite');
        let objectStore = transaction.objectStore('contacts');
        let request = objectStore.delete(contactId);

        transaction.oncomplete = () => {
            e.target.parentNode.parentNode.removeChild(e.target.parentNode);
            
            console.log(`Contact ${contactId} has been deleted`);
            
            if(!list.firstChild) {
                let listItem = document.createElement('li');
                listItem.textContent = "No contacts stored";
                list.appendChild(listItem);
            }
        };

        transaction.onerror = errors => {
            console.log("Transaction not completed. There are one ore more errors. ", errors);
        }
    }
}
