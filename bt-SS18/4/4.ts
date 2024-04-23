function validateParams(validator: (params: any[]) => boolean): MethodDecorator {
    return function(target: any, key: string | symbol, descriptor: PropertyDescriptor): void {
        const originalMethod = descriptor.value;

        descriptor.value = function(...args: any[]): any {
            if (validator(args)) {
                return originalMethod.apply(this, args);
            } else {
                throw new Error("Parameter validation failed");
            }
        };
    };
}
function paramsValidator(params: any[]): boolean {
    return params.every(param => typeof param === 'number');
}

class Example4 {
    @validateParams(paramsValidator)
    add(a: number, b: number): number {
        return a + b;
    }
}
const example4 = new Example4();
console.log(example4.add(2, 3));
console.log(example4.add("2", 3));//Error
