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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function validateParamsTypes(target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        const paramTypes = Reflect.getMetadata("design:paramtypes", target, key);
        if (paramTypes && paramTypes.length === args.length) {
            for (let i = 0; i < paramTypes.length; i++) {
                if (paramTypes[i] !== undefined && args[i] !== undefined && typeof args[i] !== paramTypes[i].name.toLowerCase()) {
                    throw new Error(`Parameter ${i + 1} has invalid type`);
                }
            }
        }
        else {
            throw new Error("Invalid number of parameters");
        }
        return originalMethod.apply(this, args);
    };
}
class Example6 {
    add(a, b) {
        return a + b;
    }
}
__decorate([
    validateParamsTypes,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Number)
], Example6.prototype, "add", null);
const example6 = new Example6();
console.log(example6.add(2, 3));
console.log(example6.add("2", 3)); //Error
