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

function DataOnScreen(data){
    var Getp=document.getElementById('ul');
    var createCh=`<li id=${data.username}> ${data.emailId} - ${data.phonenumber} - 
    <button onclick=delet('${data.username}')>Delete</button>
    <button onclick=edit('${data.username}','${data.emailID}','${data.phonenumber}')>Edit</button></li>`

    Getp.innerHTML+=createCh;
}
   
function delete(username) {
    localStorage.removeItem(username);
    removeScr(username);
}

function removeScr(data) {
    var parentnode=document.getElementById('ul');
    var ChildToBedeleted=document.getElementById(data);
    if(ChildToBedeleted){
        parentnode.removeChild(ChildToBedeleted)
    }
}

function edit(username,emailId,phonenumber){
    document.getElementById('username').value=username;
    document.getElementById('emailId').value=emailId;
    document.getElementById('phonenumber').value=phonenumber;
    delet(username);
}

*/

function showNewUserOnScreen(user) {
    var Getp = document.getElementById('ul');
    var createCh = `<li>${user.name} - ${user.email} - ${user.phonenumber}</li>`;
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

    axios.post("https://crudcrud.com/api/0872483b126b4ae497a00c02fe9253df/AppointmentsData", obj)
        .then((response) => {
            showNewUserOnScreen(response.data)
            console.log(response)
        })
        .catch((err) => {
            console.log(err);
        })

    //localStorage.setItem(obj.email, JSON.stringify(obj));
    //showNewUserOnScreen(obj);

    // Reset the form after saving
    event.target.reset();
}
