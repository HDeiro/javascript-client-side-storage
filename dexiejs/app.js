const db = new Dexie('contacts');
//Prepares database
db.version(1).stores({
    contacts: '++id, name, email'
});

//Puts data on database
db.contacts.put({
    name: "Hugo Leonardo Deiró de Souza",
    email: "hugodeiro@gmail.com"
});

