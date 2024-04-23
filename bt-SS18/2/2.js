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
function timingDecorator(target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        const start = performance.now();
        console.log(`Calling function: ${key}`);
        console.log(`Arguments: ${JSON.stringify(args)}`);
        const result = originalMethod.apply(this, args);
        const end = performance.now();
        const executionTime = end - start;
        console.log(`Execution time: ${executionTime} milliseconds`);
        console.log(`Result: ${JSON.stringify(result)}`);
        return result;
    };
}
class Example2 {
    add(a, b) {
        return a + b;
    }
}
__decorate([
    timingDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Number)
], Example2.prototype, "add", null);
const example2 = new Example2();
const sum2 = example2.add(5, 10);
console.log("Sum:", sum2);
