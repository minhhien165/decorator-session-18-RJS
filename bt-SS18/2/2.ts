function timingDecorator(target: any, key: string, descriptor: PropertyDescriptor): void {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]): any {
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
    @timingDecorator
    add(a: number, b: number): number {
        return a + b;
    }
}
const example2 = new Example2();
const sum2 = example2.add(5, 10);
console.log("Sum:", sum2);
