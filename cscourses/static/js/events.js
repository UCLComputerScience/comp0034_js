function changeText(id) {
    id.innerHTML = "I've been clicked!";
}

document.querySelector("#b2").addEventListener("click", function () {
    alert("You clicked the second button!");
});


/*
Add an event handler to the form so that ”onsubmit” the function ”processForm()” creates an alert with the message
“Event handler success"

Note: the solution displays a message on the screen rather than an alert, to get this to work you also need to prevent
the page from refreshing once the form actions are complete (otherwise the appended element will disappear). There
are 2 ways to do this (and no doubt more):
1. Add "; return false" after the function in the form tag in the html
2. On the event listener, pass the event as a parameter and prevent the default action using event.preventDefault();
See https://www.w3schools.com/jsref/event_preventdefault.asp

*/

function processForm(){
    let email = document.querySelector("#email").value;
    let txt = document.createElement("p");
    txt.innerHTML = "Hello " + email;
    document.body.appendChild(txt);
}

/*
Add an event listener so that when the form is submitted an alert is shown that displays the message (“Hello, name” ),
where name is the email address entered in the form
*/

document.querySelector("#loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var email = document.querySelector("#email").value;
    alert("Hello " + email);
});
