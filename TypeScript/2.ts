// 枚举
enum gender {
  BOY,
  GIRL
}
console.log(gender.BOY);// 0,枚举的index 是从 0 开始

// as const 将类型变为值类型
let str: string = 'chenbin';
str = 'cb';// 此处的str为string类型，所有任何string类型的值都可以为其赋值

let str1:'chenbin' = 'chenbin';// 此处的str1为chenbin类型，只能赋值为chenbin
str1 = 'cb';// 不能将类型“"cb"”分配给类型“"chenbin"”。

let str3 =  'chenbin';// let str3: string,自动推断为string类型
let str4 = 'chenbin' as const;//let str4: "chenbin",经过as const 之后，变为chenbin类型，为值类型

let array = [123,'chenbin',true,str];// let array: (string | number | boolean)[];自动推断类型
let array2  = [123,'chenbin',true,str] as const;// let array2: readonly [123, "chenbin", true,string]；数组经过 as const之后，变为对应类型的元组,并且为只读
let array3 = <const>[123,'chenbin']

let object = {
  name:'chenbin'
}// et object: { name: string;},自动推断属性为string类型

let object2 = {
  name:'chenbin'
} as const; // readonly name: "chenbin";  name属性为chenbin类型

function cb() {
  let s: string = 'chenbin';
  let f: (a:number,b:number) => number = (x:number,y:number):number => {
    return x + y;
  }
  return [s,f];
}

// let [s,f] = cb() as [string,Function];
let [s,f] = cb();// 因为cb方法返回的是(string | ((a: number, b: number) => number))[]类型的数组，所以解构的s或者f都是这种类型，无法准确区分哪个是function类型，所以这里用断言来明确f是function类型。
console.log((f as Function)(1,1));// 2
