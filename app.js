const form = document.getElementById('my-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const numberInput = document.getElementById('number');
const tableBody = document.querySelector('table#my-table tbody');
let data = [];
// localStorage.clear();
// Get data from local storage and display it in the table

window.addEventListener("DOMContentLoaded",()=>{
axios.get("https://crudcrud.com/api/c1fb6e1bd15241ecba7449682a8770e5/appointmentData")
.then((response)=>{
     console.log(response);
     for(let i=0;i<response.data.length;i++){
        const userData = response.data[i];
                data.push(userData);
                displayUserData(userData);
     }
})
.catch((error)=>{
    console.log(error);
})

// for (let i = 0; i < localStorage.length; i++) {
//     const key = localStorage.key(i);
//     if (key.startsWith('user ')) {
//         const userData = JSON.parse(localStorage.getItem(key));
//         data.push(userData);
//         displayUserData(userData);
//     }
// }
})


form.addEventListener('submit', function(e) {
    e.preventDefault();
    const userData = {Name: nameInput.value, Email: emailInput.value, Phone: numberInput.value};
    data.push(userData);
    displayUserData(userData);
    // localStorage.setItem(`user ${localStorage.length + 1}`, JSON.stringify(userData));
    axios.post("https://crudcrud.com/api/c1fb6e1bd15241ecba7449682a8770e5/appointmentData",userData)
    .then((response)=>{
        console.log(response);
    })
    .catch((err)=>{
        console.log(err);
    })
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
    const editCell = document.createElement('td');
    const editButton = document.createElement('span');

    deleteButton.id = 'delete-button';
    editButton.id = 'edit-button';
    deleteButton.textContent = 'Delete';
    editButton.textContent = 'Edit';



    deleteButton.addEventListener('click', function() {
        const rowIndex = Array.from(tableBody.children).indexOf(row);
        data.splice(rowIndex, 1);
        localStorage.removeItem(`user ${rowIndex + 1}`);
        tableBody.removeChild(row);
    });


    editButton.addEventListener('click', function() {
        // Repopulate form fields with user data
        nameInput.value = userData.Name;
        emailInput.value = userData.Email;
        numberInput.value = userData.Phone;

        // Remove user data from the array and localStorage
        const rowIndex = Array.from(tableBody.children).indexOf(row);
        data.splice(rowIndex, 1);
        localStorage.removeItem(`user ${rowIndex + 1}`);

        // Remove row from the table
        tableBody.removeChild(row);
    });




    deleteCell.appendChild(deleteButton);
    // deleteCell.appendChild(editButton);
    editCell.appendChild(editButton);
    row.appendChild(deleteCell);
    row.appendChild(editCell);
    // row.appendChild(editCell);
    tableBody.appendChild(row);
}
