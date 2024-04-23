"use strict";
function combineFunctions(...functions) {
    return function (...args) {
        let result;
        for (const fn of functions) {
            if (result === undefined) {
                result = fn.apply(this, args);
            }
            else {
                result = fn.call(this, result);
            }
        }
        return result;
    };
}
function multiplyByTwo(num) {
    return num * 2;
}
function addFive(num) {
    return num + 5;
}
const combinedFunction = combineFunctions(multiplyByTwo, addFive);
console.log(combinedFunction(2));
