//SELECTING ELEMENTS


// Get all elements matching specified selectors
var content = document.querySelectorAll(".lead p");
content[0];
content[1];


// Get a single element using its id
var myTitleLink = document.getElementById("aLink");
//OR
var myTitleLink = document.querySelector("#aLink");
myTitleLink.innerHTML;

console.log("This is a node of type: ", myTitleLink.nodeType);
console.log("Inner HTML: ", myTitleLink.innerHTML);

// Get elements using the HTML tag name
var myParas = document.getElementsByTagName("p");
console.log("Paragraphs: ", myParas.length);



//CHANGING AND ADDING ELEMENTS

// 1. Change alignment of the main section
//var mainContent = document.getElementById("mainContent");
var mainContent = document.querySelector("#mainContent");
mainContent.setAttribute("align","center");

// 2. Change content of the first h1 element in the mainContent section
// var arrayOfH1s = mainContent.getElementsByTagName("h1");
//OR
var arrayOfH1s = mainContent.querySelectorAll("h1");
arrayOfH1s[0].innerHTML = "This is a new title";


//3. Add a new heading
var newHeading = document.createElement("h1");
newHeading.innerHTML = "I am a new heading!"; // to add content to the heading, either use innerHTML
document.body.appendChild(newHeading); // and we still need to attach them to the document!

