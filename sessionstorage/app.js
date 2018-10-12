// DOM properties
const input = document.querySelector("#name");
const form = document.querySelector("#form");
const addName = document.querySelector("#addName");
const removeName = document.querySelector("#removeName");
const h1 = document.querySelector("#title");

// Treating submit
form.addEventListener('submit', evt => {
    evt.preventDefault();
});

// Save value
addName.addEventListener('click', () => {
    sessionStorage.setItem('name', input.value);
    updateValue();
});

// Remove value
removeName.addEventListener('click', () => {
    sessionStorage.removeItem('name');
    updateValue();
    input.value = "";
})

// Setting value to H1
function updateValue() {
    const name = sessionStorage.getItem("name");
    h1.textContent = name ? `Welcome ${name}` : "So sad, nobody to welcome";
}
updateValue();