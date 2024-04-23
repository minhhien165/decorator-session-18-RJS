function combineFunctions(...functions: Function[]) {
    return function (this: any, ...args: any[]) {
      let result: any;
  
      for (const fn of functions) {
        if (result === undefined) {
          result = fn.apply(this, args);
        } else {
          result = fn.call(this, result);
        }
      }  
      return result;
    };
}  
function multiplyByTwo(num: number): number {
  return num * 2;
}  
function addFive(num: number): number {
  return num + 5;
}
const combinedFunction = combineFunctions(multiplyByTwo, addFive);
console.log(combinedFunction(2));