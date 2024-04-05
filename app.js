// var button = document.getElementById('submitButton');

// button.addEventListener('click', function(){
//     alert('Successfully Submitted');
// });

// // Connect to the Socket.IO server
// const socket = io();

// // Listen for messages from the server
// socket.on('formSubmission', (data) => {
//   console.log('Message from server:', data.message);
//   // You can update your frontend UI or perform any other actions with the received message
// });

document.getElementById('userForm').addEventListener('submit', function (event) 
{
  // Validation for phone number
  var phoneInput = document.getElementById('phone');
  var phoneRegex = /^\d{11}$/;
  // Change the regular expression according to your phone number format
  if (!phoneRegex.test(phoneInput.value)) {
    alert('Please enter a valid phone number (11 digits).');
    event.preventDefault();
    return false;
  }

  // Validation for email
  var emailInput = document.getElementById('email');
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
  if (!emailRegex.test(emailInput.value)) 
  {
    alert('Please enter a valid email address.');
    event.preventDefault();
    return false;
  }

});

// passport preview
function previewPassport(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const passportPreview = document.getElementById('passportPreview');
        passportPreview.src = event.target.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    }
}


document.getElementById('submitButton').addEventListener('click', function() 
{
  // Check if any required field is empty
  const requiredFields = document.querySelectorAll('input[required], select[required]');
  let formValid = true;
  requiredFields.forEach(function(field) 
  {
    if (!field.value) {
      formValid = false;
    }
  });
  // If any required field is empty, display alert
  if (!formValid) {
      alert('Please fill in all required fields before submitting the form.');
    } else {
    // If all required fields are filled, submit the form
    document.getElementById('userForm').submit();
  }
});

// Sample form submissions data
const formData = [
    { id: 1, surname: 'Doe', firstName: 'John' },
    { id: 2, surname: 'Smith', firstName: 'Alice' },
    { id: 3, surname: 'Johnson', firstName: 'Bob' },
    // More data...
];

// Constants for pagination
const pageSize = 5;
let currentPage = 1;

// Function to display form submissions
function displayFormSubmissions(page) {
    const tableBody = document.querySelector('#submissionTable tbody');
    tableBody.innerHTML = '';

    const startIdx = (page - 1) * pageSize;
    const endIdx = Math.min(startIdx + pageSize, formData.length);

    for (let i = startIdx; i < endIdx; i++) {
        const submission = formData[i];
        const row = `<tr>
            <td>${submission.id}</td>
            <td>${submission.surname}</td>
            <td>${submission.firstName}</td>
            <td>
                <button onclick="editSubmission(${submission.id})">Edit</button>
                <button onclick="deleteSubmission(${submission.id})">Delete</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    }

    updatePagination();
}

// Function to update pagination
function updatePagination() {
    const paginationDiv = document.querySelector('#pagination');
    paginationDiv.innerHTML = '';

    const totalPages = Math.ceil(formData.length / pageSize);
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = `<a href="#" onclick="goToPage(${i})">${i}</a>`;
        paginationDiv.innerHTML += pageLink;
    }
}

// Function to go to a specific page
function goToPage(page) {
    currentPage = page;
    displayFormSubmissions(currentPage);
}

// Function to perform search
function searchSubmissions() {
    const searchInput = document.querySelector('#searchInput').value.toLowerCase();
    const filteredData = formData.filter(submission => {
        return submission.surname.toLowerCase().includes(searchInput) ||
            submission.firstName.toLowerCase().includes(searchInput);
    });

    // Update formData with filtered data
    formData.length = 0;
    Array.prototype.push.apply(formData, filteredData);

    displayFormSubmissions(1); // Display first page of search results
}

// Function to edit a submission
function editSubmission(id) {
    // Code to edit submission goes here
    console.log('Edit submission:', id);
}

// Function to delete a submission
function deleteSubmission(id) {
    // Code to delete submission goes here
    console.log('Delete submission:', id);
}

// Initialize the admin panel
displayFormSubmissions(currentPage);
