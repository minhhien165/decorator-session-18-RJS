"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function validateParams(validator) {
    return function (target, key, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            if (validator(args)) {
                return originalMethod.apply(this, args);
            }
            else {
                throw new Error("Parameter validation failed");
            }
        };
    };
}
function paramsValidator(params) {
    return params.every(param => typeof param === 'number');
}
class Example4 {
    add(a, b) {
        return a + b;
    }
}
__decorate([
    validateParams(paramsValidator),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Number)
], Example4.prototype, "add", null);
const example4 = new Example4();
console.log(example4.add(2, 3));
console.log(example4.add("2", 3)); //Error
