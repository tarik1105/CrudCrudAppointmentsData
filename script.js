///////////for adding in local storage////////////////
/*
function saveToLocalStorage(event){
    event.preventDefault();

    const name = event.target.username.value;
    const email = event.target.emailId.value;
    const phonenumber = event.target.phonenumber.value;

    const obj = {
        name,
        email,
        phonenumber
    }
    localStorage.setItem(obj.email, JSON.stringify(obj));
    showNewUserOnScreen(obj);
}

window.addEventListener("DOMContentLoaded", () => {
    const localStorageObj = localStorage;
    const localStoragekeys = Object.keys(localStorageObj);

    for(var i=0; i < localStoragekeys.length; i++){
        const key = localStoragekeys[i];
        const userDetailsString = localStorageObj[key];
        const userDetailsObj = JSON.parse(userDetailsString);
        showNewUserOnScreen(userDetailsObj);
    }
});

function showNewUserOnScreen(user){
    document.getElementById('email').value = '';
    document.getElementById('username').value = '';
    document.getElementById('phonenumber').value = '';
    if(localStorage.getItem(user.email) !== null){
        removeUserFromScreen(user.email)
    }
    const parentNode = document.getElementById('ul');
    const childHTML = `<li id=${user.username}> ${user.emailId} - ${user.phonenumber} - 
    <button onclick=delet('${user.username}')>Delete</button>
    <button onclick=edit('${user.username}','${user.emailID}','${user.phonenumber}')>Edit</button></li>`

    parentNode.innerHTML+=childHTML;
}
   
function del(username) {
    localStorage.removeItem(username);
    removeScr(username);
}

function removeScr(user) {
    var parentnode1=document.getElementById('ul');
    var ChildToBedeleted=document.getElementById(user);
    if(ChildToBedeleted){
        parentnode1.removeChild(ChildToBedeleted)
    }
}

function edit(username,emailId,phonenumber){
    document.getElementById('username').value=username;
    document.getElementById('emailId').value=emailId;
    document.getElementById('phonenumber').value=phonenumber;
    del(username);
}
*/


function showNewUserOnScreen(user) {
    var Getp = document.getElementById('ul');
    var createCh = `<li>${user.name} - ${user.email} - ${user.phonenumber} - 
    <button onclick=delete('${user.name}')>Delete</button>
    <button onclick=editUser('${user.name}','${user.email}','${user.phonenumber}')>Edit</button></li>`;
    Getp.innerHTML += createCh;
}

function saveToLocalStorage(event) {
    event.preventDefault();

    const name = event.target.username.value;
    const email = event.target.email.value;
    const phonenumber = event.target.phonenumber.value;

    const obj = {
        name,
        email,
        phonenumber
    };
    

    axios.post("https://crudcrud.com/api/8e3e1594289d4c1ba44567a070086e44/AppointmentsData", obj)
        .then((response) => {
            showNewUserOnScreen(response.data)
            console.log(response)
        })
        .catch((err) => {
            console.log(err);
        })

    axios.get("https://crudcrud.com/api/8e3e1594289d4c1ba44567a070086e44/AppointmentsData")
        .then((response) => {
            console.log(response)
            for(var i=0; i < response.data.length; i++)
            {
                showNewUserOnScreen(response.data[i])
            }
        })
        .catch((error) => console.log(error));


    //localStorage.setItem(obj.email, JSON.stringify(obj));
    //showNewUserOnScreen(obj);

    // Reset the form after saving
    event.target.reset();
}

function deleteUser(userId) {
    axios.delete(`https://crudcrud.com/api/8e3e1594289d4c1ba44567a070086e44/AppointmentsData/${userId}`)
      .then(() => {
        // Remove the deleted user detail from the website
        var listItem = document.querySelector(`li[data-userid="${userId}"]`);
        if (listItem) {
          listItem.remove();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  

function editUser(userId, name, email, phonenumber) {
    var usernameInput = document.getElementById('username');
    var emailInput = document.getElementById('email');
    var phonenumberInput = document.getElementById('phonenumber');
  
    // Set the form values to the user details for editing
    usernameInput.value = name;
    emailInput.value = email;
    phonenumberInput.value = phonenumber;
  
    // Add an event listener to the form submit button for updating the user details
    var submitButton = document.querySelector('.btn-outline-primary');
    submitButton.addEventListener('click', function (event) {
      event.preventDefault();
  
      // Get the updated values from the form
      var updatedName = usernameInput.value;
      var updatedEmail = emailInput.value;
      var updatedPhonenumber = phonenumberInput.value;
  
      // Update the user details in the API
      axios.put(`https://crudcrud.com/api/8e3e1594289d4c1ba44567a070086e44/AppointmentsData/${userId}`, {
        name: updatedName,
        email: updatedEmail,
        phonenumber: updatedPhonenumber
      })
        .then(() => {
          // Update the user details on the website
          var listItem = document.querySelector(`li[data-userid="${userId}"]`);
          if (listItem) {
            listItem.innerHTML = `${updatedName} - ${updatedEmail} - ${updatedPhonenumber} <i class="fas fa-edit" onclick="editUser('${userId}', '${updatedName}', '${updatedEmail}', '${updatedPhonenumber}')"></i>`;
          }
        })
        .catch((error) => {
          console.log(error);
        });
  
      // Reset the form after updating
      event.target.reset();
  
      // Remove the event listener to prevent multiple submissions
      submitButton.removeEventListener('click', this);
    });
  }
  



