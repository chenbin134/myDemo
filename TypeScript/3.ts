// 泛型

function a(arg:string):string{
  return arg
}

let r = a('aaaa');

function b(arg:boolean):boolean{
  return arg
}

let r2 = b(true);

// 以上俩个函数，其实函数的作用相同(都是返回传入的参数)，只是因为参数类型以及返回类型不同，导致不能复用为一个函数
// 因此，泛型可以解决这个问题，可以根据泛型传入的类型，自动推断参数类型以及返回的类型，可以理解为一个变量

function common<T>(arg:T):T{
  return arg;
}

let result1 = common<string>('string');
let resutl2 = common<boolean>(true);
let result3 = common('string');


class collection<T> {
   data:T[] =[];
   public push(...args:T[]){
     this.data.push(...args)
   }
   public read(){
     console.log(this.data)
   }
}

const collection1 = new collection<number>();
collection1.push(1,2,3,4);

const collection2 = new collection<string>();
collection2.push('string','string');

type user = {name:string,age:number};
const usr:user = {name:'chenbin',age:18};

const collection3 = new collection<user>();
collection3.push(usr,usr);


interface student<b,c,d> {
  name:string,
  age:number,
  hasBook:b,
  hobby:d[],
  scores:c[]
}
type hobbyType = {
  name:string
}
const studentObj:student<boolean,number,hobbyType> = {
  name:'chenbin',
  age:18,
  hasBook:true,
  hobby:[{
    name:'basketball'
  }],
  scores:[1,2,3,4]


  
}

// 用 keyof 获取O上的所有 public 属性名构成联合类型

class O {
  public name: string;
  public age : number;
  constructor(){
    this.name = 'name';
    this.age = 12;
  }
}

type a = keyof O; // name | age

let sss: a = 'name';

type v = O[a];

let value: v = 'true'


// pick 方法根据传入的对象，以及要取的key来返回对应的value
// keyArray 只能是user2上拥有的key，因此用keyof 来做约束

const user2 = {
  name: 'chenbin',
  age: 18,
  gender: 'male',
  isStudent: true
}


// const pick = <T,K extends keyof T>(obj: T,keyArray: K[]): T[K][] => {
//   return keyArray.map(key => obj[key])
// }

function pick<T,K extends keyof T>(obj: T,keyArray: K[]): T[K][] {
  return keyArray.map(key => obj[key]);
}

const values = pick(user2,['name','gender','isStudent']);


// in 映射类型

interface U {
  name: string,
  age: number,
}

// 将传入的类型变成可选
type partial<T> = {
  [K in keyof T]?: T[K]
}

const user3: partial<U> = {
  name: 'name',
}

const user4: U = {
  name: 'name',
  age: 12,
}