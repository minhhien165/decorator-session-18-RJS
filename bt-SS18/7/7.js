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
function applyMiddleware(...middlewares) {
    return function (target, key, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            middlewares.forEach((middleware) => {
                middleware.apply(this, args);
            });
            const result = originalMethod.apply(this, args);
            middlewares.forEach((middleware) => {
                middleware.apply(this, args);
            });
            return result;
        };
    };
}
function logBefore(target, key, descriptor) {
    console.log(`Before calling method ${String(key)} with arguments: ${JSON.stringify(descriptor.value.arguments)}`);
}
function logAfter(target, key, descriptor) {
    console.log(`After calling method ${String(key)} with arguments: ${JSON.stringify(descriptor.value.arguments)}`);
}
class Example7 {
    add(a, b) {
        return a + b;
    }
}
__decorate([
    applyMiddleware(logBefore, logAfter),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Number)
], Example7.prototype, "add", null);
const example7 = new Example7();
console.log(example7.add(2, 3));
