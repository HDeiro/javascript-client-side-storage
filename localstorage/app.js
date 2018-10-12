//Setting a value
localStorage.setItem("name", "Hugo");
localStorage.setItem("name2", "Deiró");

// Getting a value
const name = localStorage.getItem("name");
const h1 = document.querySelector("#title");

h1.textContent = name ? `Welcome ${name}` : "So sad, nobody to welcome";

// Removing a value
localStorage.removeItem("name2");