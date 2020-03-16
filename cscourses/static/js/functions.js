/* Functions */

//Named function
function findBiggest(firstFraction, secondFraction) {
    let result;
    if (firstFraction > secondFraction) {
        result = "The first fraction is bigger: " + firstFraction + " than the second fraction: " + secondFraction;
    } else {
        result = "The second fraction is bigger: " + secondFraction + " than the first fraction: " + firstFraction;
    }
    return result;
}

//console.log(findBiggest(2 / 3, 7 / 12));

//Anonymous function
let biggest = function (firstFraction, secondFraction) {
    let result;
    if (firstFraction > secondFraction) {
        result = "The first fraction is bigger: " + firstFraction + " than the second fraction: " + secondFraction;
    } else {
        result = "The second fraction is bigger: " + secondFraction + " than the first fraction: " + firstFraction;
    }
    return result;
};

//console.log(biggest(2 / 3, 7 / 12));

//Self-invoking function
let selfInvokingFunction = (function (firstFraction, secondFraction) {
    let result;
    if (firstFraction > secondFraction) {
        result = "The first fraction is bigger: " + firstFraction + " than the second fraction: " + secondFraction;
    } else {
        result = "The second fraction is bigger: " + secondFraction + " than the first fraction: " + firstFraction;
    }
    return result;
})(2 / 3, 7 / 12);

//console.log(selfInvokingFunction);