
// const form = document.getElementById('my-form');
// const nameInput = document.getElementById('name');
// const emailInput = document.getElementById('email');
// const numberInput = document.getElementById('number');
// const data = [];
// const c=0;
// form.addEventListener('submit', function(e){
//     e.preventDefault();
//     data.push({Name:nameInput.value,Email:emailInput.value,Phone:numberInput.value});


//     localStorage.setItem("user "+ ++c, JSON.stringify(data));

//     nameInput.value = '';
//     emailInput.value = '';
//     numberInput.value = '';

// })


const form = document.getElementById('my-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const numberInput = document.getElementById('number');
let c = 0;

// Retrieve data from local storage and display it on page load
window.addEventListener('load', function() {
  const dataList = document.getElementById('data-list');
  let keys = Object.keys(localStorage);
  keys.forEach(function(key) {
    if (key.startsWith('user ')) {
      const data = JSON.parse(localStorage.getItem(key));
      const listItem = document.createElement('li');
      listItem.innerText = `Name: ${data.Name}, Email: ${data.Email}, Phone: ${data.Phone}`;
      dataList.appendChild(listItem);
      c++;
    }
  });
});

// Handle form submission and store data in local storage
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = {
    Name: nameInput.value,
    Email: emailInput.value,
    Phone: numberInput.value
  };

  localStorage.setItem(`user ${++c}`, JSON.stringify(formData));

  // Clear the form inputs
  nameInput.value = '';
  emailInput.value = '';
  numberInput.value = '';

  // Add the new data to the list on the page
  const dataList = document.getElementById('data-list');
  const listItem = document.createElement('li');
  listItem.innerText = `Name: ${formData.Name}, Email: ${formData.Email}, Phone: ${formData.Phone}`;
  dataList.appendChild(listItem);
});
