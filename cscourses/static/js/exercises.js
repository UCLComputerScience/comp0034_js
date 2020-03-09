//Exercise 1 Named function

function findBiggest(firstFraction,secondFraction){
    var result;
    if (firstFraction>secondFraction){
        result = "The first fraction is bigger: " + firstFraction + " than the second fraction: " + secondFraction;
    } else {
        result = "The second fraction is bigger: " + secondFraction + " than the first fraction: " + firstFraction;;
    }
    return result;
}

console.log(findBiggest(2/3,7/12));

//Exercise 2 Anonymous function

var biggest = function(firstFraction,secondFraction){
    var result;
    if (firstFraction>secondFraction){
        result = "The first fraction is bigger: " + firstFraction + " than the second fraction: " + secondFraction;
    } else {
        result = "The second fraction is bigger: " + secondFraction + " than the first fraction: " + firstFraction;;
    }
    return result;
}

console.log(biggest(2/3,7/12));

//Exercise 3 Self-invoking function

var biggest = (function(firstFraction,secondFraction){
    var result;
    if (firstFraction>secondFraction){
        result = "The first fraction is bigger: " + firstFraction + " than the second fraction: " + secondFraction;
    } else {
        result = "The second fraction is bigger: " + secondFraction + " than the first fraction: " + firstFraction;;
    }
    return result;
})(2/3,7/12)

console.log(biggest);


//Exercise 4 DOM
document.querySelectorAll('p')[4].className = "text-uppercase";

var img = document.createElement("img");
img.src = "img/logo.jpg";
img.className = "rounded";
document.querySelector("h2").appendChild(img);


//Exercise 5 DOM Event handling

function processForm(){
    var email = document.querySelector("#email").value;
    var txt = document.createElement("p").innerHTML(email);
    document.body.appendChild(txt);
}

document.querySelector("#loginForm").addEventListener("submit", function (e) {
    console.log("s");
    e.preventDefault();
    var email = document.querySelector("#email").value;
    alert("Hello " + email);
});