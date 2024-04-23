import 'reflect-metadata';

function validateParamsTypes(target: any, key: string | symbol, descriptor: PropertyDescriptor): void {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]): any {
        const paramTypes = Reflect.getMetadata("design:paramtypes", target, key);
        if (paramTypes && paramTypes.length === args.length) {
            for (let i = 0; i < paramTypes.length; i++) {
                if (paramTypes[i] !== undefined && args[i] !== undefined && typeof args[i] !== paramTypes[i].name.toLowerCase()) {
                    throw new Error(`Parameter ${i + 1} has invalid type`);
                }
            }
        } else {
            throw new Error("Invalid number of parameters");
        }

        return originalMethod.apply(this, args);
    };
}

class Example6 {
    @validateParamsTypes
    add(a: number, b: number): number {
        return a + b;
    }
}
const example6 = new Example6();
console.log(example6.add(2, 3));
console.log(example6.add("2", 3));//Error
