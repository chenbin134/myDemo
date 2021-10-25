function add(a: number, b: number, c: number = 0.5): number {
  return a + b;
}

// add('aa',2)
add(2, 3)


let name1 = 'chenbin';// 自动推断类型为string
name1 = 123;

let name2: string | number = 123;
name2 = 'chenbin'


let arr: (number | string | boolean)[] = [1, 2, 3, 4, '55'];
arr.push('666', true, 123, 'bbb');




let obj = {
  name: 'chenbin',
  age: 20,
  hobby: ['study', 'sleep']
}
let age = obj.age;// 自动推断类型为number
age = 'strging';


let obj2: {
  name: string,
  age: string,
} = {
  name: 'chenbin',
  age: '12',
  gender: 1
}

let obj3: object = {};
obj3 = 123;
obj3 = {
  name: 'chenbin'
}

let v: unknown = 'chenbin';
let aa: string = v;// v是unknow类型，aa是string，所以不能接收
let bb: string = v as string;

let v1: number = 123;
let aa1: string = v1;
let bb2: string = v1 as any as string;

let n: null = null;
let u: undefined = undefined;

function fn(): void | undefined | string | null {
  // return 'aaa'
  // return undefined;
  // return true;
  // return null;

}

let func: Function = () => { };

function create(params: { id: number, method: string, order: object }): void {

}

create({
  id: 123,
  method: 'add',
  order: {
    desc: true
  }
})

type params = { id: number, method: string, order: object };
function create2(params: params) {

}

create2({
  id: 123,
  method: 'add',
  order: {
    desc: false
  }
})

let fun:(a:number,b:number) => number;// 函数的定义 ，类似let s:string; s = 'abc';定义和实现时的形参的变量名可以不一样；
func = (x:number,y:number): number=>{
return x + y;
}

type f = (a:number,b:number) => number;
let fun2:f = (x:number,y:number):number => {
  return x + y;
}

let fun3:(a:number,b:number) => number = (x:number,y:number):number => {
  return x + y;
}

// 元组
let tuple:[string,number] = ['string',123];