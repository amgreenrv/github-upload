/* 

This final toy problem will utilize the social media page you replicated using HTML/CSS in Week 1. Now that you've learned some Javascript, it's time to add some functionality to your page!

Requirements:

* Add form validation via the submit button:
    No fields should be left empty
    Name should only contain letters
    Comments should be less than 500 characters
    Date should be formatted "MM-DD-YYYY"
* Remember to provide user feedback if submission fails!

* New entries/submissions should be rendered in the table below

* Functionality should be added so that users may either edit any information in any entry, or delete any entry entirely 

Bonus:
 * Add filter functionality for displaying specific entries by name, date, etc. 

*/

//Form Submission

const form = document.getElementById("comment-box");

form.addEventListener("submit", function (event) {
  event.preventDefault(); //prevent auto submission

  let error = [];
  let username = document.getElementById("name");
  let date = document.getElementById("date");
  let post = document.getElementById("comment");


//Form Validation
  
   let alpha = /^[a-zA-Z\s]*$/;
  if (username.value == "") {
    error.push(" Please enter your name");
  }
  if (!username.value.match(alpha)) {
    error.push(" Name must contain only letters");
  }
  if (date.value == "") {
    error.push(" Please select the date");
  }
  if (post.value.length > 500) {
    error.push(" Posts must be less than 500 characters");
  }

  let message = document.getElementById("message");
  message.innerText = error;

  let formSubmission = username.value + " " + post.value + " " + date.value;
  console.log(formSubmission);
  
  
  
  
  //Stop Row Validation
  
    if (username.value == "") {
    return false;
  }
  if (!username.value.match(alpha)) {
    return false;
  }
  if (date.value == "") {
    return false;
  }
  if (post.value.length > 500) {
    return false;
  } else {
    addRow();
  }
  
  
   //Formatting the date
  
  function formatDate(input) {
    let datePart = input.match(/\d+/g),
      year = datePart[0].substring(0, 4),
      month = datePart[1],
      day = datePart[2].substring(2, 0);

    return month + "/" + day + "/" + year;
  }
  
  
  
   //Adding a table row after form submission
  
  function addRow() {
    let fixDate = formatDate(date.value);
    let fixForm = document.getElementById("td-select").outerHTML;
    let table = document.getElementById("comment-table");
    let row = table.insertRow(1);
    let td1 = row.insertCell(0);
    let td2 = row.insertCell(1);
    let td3 = row.insertCell(2);
    let td4 = row.insertCell(3);
    td1.innerText = username.value;
    td2.innerText = post.value;
    td3.innerText = fixDate;
    td4.outerHTML = fixForm;
  }
});


//Dropdown menu selector

const selectElement = document.querySelector("#comment-table");

selectElement.addEventListener("change", (event) => {
  
  //If delete is selected, remove row
  
  if (event.target.value == "post-delete") {
    event.target.parentNode.parentNode.parentNode.remove();
  }

  //If edit is selected, edit row
  
  else if (event.target.value == "post-edit") {
    event.target.parentNode.parentNode.parentNode.setAttribute(
      "contenteditable",
      true
    );
  }

  //If save is selected, remove editable attribute
  
  else if (event.target.value == "post-save") {
    event.target.parentNode.parentNode.parentNode.setAttribute(
      "contenteditable",
      false
    );
  } else {
    console.log("Nothing Selected.");
  }
});



//Table Sort