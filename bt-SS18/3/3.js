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
function cachingDecorator(target, key, descriptor) {
    const cache = new Map();
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        const cacheKey = JSON.stringify(args);
        if (cache.has(cacheKey)) {
            console.log("Using cached result...");
            return cache.get(cacheKey);
        }
        else {
            console.log("Calculating result...");
            const result = originalMethod.apply(this, args);
            cache.set(cacheKey, result);
            return result;
        }
    };
}
class Example3 {
    add(a, b) {
        console.log("Adding...");
        return a + b;
    }
}
__decorate([
    cachingDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Number)
], Example3.prototype, "add", null);
const example3 = new Example3();
console.log(example3.add(2, 3));
console.log(example3.add(2, 3));
