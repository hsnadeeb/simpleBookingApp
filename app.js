const form = document.getElementById('my-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const numberInput = document.getElementById('number');
const tableBody = document.querySelector('table#my-table tbody');
let data = [];

// Get data from local storage and display it in the table
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('user ')) {
        const userData = JSON.parse(localStorage.getItem(key));
        data.push(userData);
        displayUserData(userData);
    }
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const userData = {Name: nameInput.value, Email: emailInput.value, Phone: numberInput.value};
    data.push(userData);
    displayUserData(userData);
    localStorage.setItem(`user ${localStorage.length + 1}`, JSON.stringify(userData));
    form.reset();
});

function displayUserData(userData) {
    const row = document.createElement('tr');
    for (const property in userData) {
        const cell = document.createElement('td');
        cell.textContent = userData[property];
        row.appendChild(cell);
    }
    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('span');
    deleteButton.id = 'delete-button';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        const rowIndex = Array.from(tableBody.children).indexOf(row);
        data.splice(rowIndex, 1);
        localStorage.removeItem(`user ${rowIndex + 1}`);
        tableBody.removeChild(row);
    });
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);
    tableBody.appendChild(row);
}
