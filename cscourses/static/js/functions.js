/* Functions */

//Named function
function findBiggest(firstFraction, secondFraction) {
    var result;
    if (firstFraction > secondFraction) {
        result = "The first fraction is bigger: " + firstFraction + " than the second fraction: " + secondFraction;
    } else {
        result = "The second fraction is bigger: " + secondFraction + " than the first fraction: " + firstFraction;
    }
    return result;
}

console.log(findBiggest(2 / 3, 7 / 12));

//Anonymous function
var biggest = function (firstFraction, secondFraction) {
    var result;
    if (firstFraction > secondFraction) {
        result = "The first fraction is bigger: " + firstFraction + " than the second fraction: " + secondFraction;
    } else {
        result = "The second fraction is bigger: " + secondFraction + " than the first fraction: " + firstFraction;
    }
    return result;
};

console.log(biggest(2 / 3, 7 / 12));

//Self-invoking function

var biggest = (function (firstFraction, secondFraction) {
    var result;
    if (firstFraction > secondFraction) {
        result = "The first fraction is bigger: " + firstFraction + " than the second fraction: " + secondFraction;
    } else {
        result = "The second fraction is bigger: " + secondFraction + " than the first fraction: " + firstFraction;
    }
    return result;
})(2 / 3, 7 / 12);

console.log(biggest);


/* Variable scope */
//Global variable
var count = 0;  //Global
function incr(n) {
    count += n;
}

function reset() {
    count = 0;
}

incr(4);
reset();
incr(2);
console.log(count);

//Function scope
function everything() {
    var count = 0;

    function incr(n) {
        count += n;
    }

    function reset() {
        count = 0;
    }

    incr(4);
    reset();
    incr(2);
    console.log(count);
}

everything();

//Block scope
/*
Variables declared with the let keyword can have Block Scope, variables declared inside a block {} using let cannot be
accessed from outside the block, variables inside a block {} using var can be accessed from outside the block.
 */
if (true) {
    var x = 2;
    let y = 2;
}
console.log(x);
console.log(y);  //should give an error that y is undefined

