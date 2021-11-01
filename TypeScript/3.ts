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