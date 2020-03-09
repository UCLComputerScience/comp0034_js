function changeText(id) {
    id.innerHTML = "I've been clicked!";
}

document.querySelector("#b2").addEventListener("click", function () {
    alert("You clicked the second button!");
});
