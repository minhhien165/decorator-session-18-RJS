function logFunction(target: any, key: string, descriptor: PropertyDescriptor): void {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]): any {
        console.log(`Calling function: ${key}`);
        console.log(`Arguments: ${JSON.stringify(args)}`);
        
        const result = originalMethod.apply(this, args);
        console.log(`Result: ${JSON.stringify(result)}`);
        
        return result;
    };
}
class Example1 {
    @logFunction
    add(a: number, b: number): number {
        return a + b;
    }
}
const example1 = new Example1();
const sum1 = example1.add(5, 10);
console.log("Sum:", sum1);
