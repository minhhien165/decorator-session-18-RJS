function cachingDecorator(target: any, key: string, descriptor: PropertyDescriptor): void {
    const cache: Map<string, any> = new Map(); 
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]): any {
        const cacheKey = JSON.stringify(args); 
        if (cache.has(cacheKey)) {
            console.log("Using cached result...");
            return cache.get(cacheKey); 
        } else {
            console.log("Calculating result...");
            const result = originalMethod.apply(this, args); 
            cache.set(cacheKey, result);
            return result;
        }
    };
}
class Example3 {
    @cachingDecorator
    add(a: number, b: number): number {
        console.log("Adding...");
        return a + b;
    }
}
const example3 = new Example3();
console.log(example3.add(2, 3)); 
console.log(example3.add(2, 3));
