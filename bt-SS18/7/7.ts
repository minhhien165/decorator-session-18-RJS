
function applyMiddleware(...middlewares: Function[]): MethodDecorator {
    return function(target: any, key: string | symbol, descriptor: PropertyDescriptor): void {
        const originalMethod = descriptor.value;

        descriptor.value = function(...args: any[]): any {
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

function logBefore(target: any, key: string | symbol, descriptor: PropertyDescriptor): void {
    console.log(`Before calling method ${String(key)} with arguments: ${JSON.stringify(descriptor.value.arguments)}`);
}

function logAfter(target: any, key: string | symbol, descriptor: PropertyDescriptor): void {
    console.log(`After calling method ${String(key)} with arguments: ${JSON.stringify(descriptor.value.arguments)}`);
}

class Example7 {
    @applyMiddleware(logBefore, logAfter)
    add(a: number, b: number): number {
        return a + b;
    }
}

const example7 = new Example7();
console.log(example7.add(2, 3));