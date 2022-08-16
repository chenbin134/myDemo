/**
 * TypeScript 内置工具类型
 */

// 1.Exclude 排除联合类型中的某些类型 
// type Exclude<T, U> = T extends U ? never : T;
type E1 = Exclude<string | number,string>; // 排除string剩下number
type E2 = Exclude<string | number | boolean,number | boolean>;
const E1Value: E1 = 123;
const E2Value: E2 = 'string';


// 2.Extract 提取一个联合类型中的某些类型
// type Extract<T, U> = T extends U ? T : never;

type E3 = Extract<string | number,number>;
const E3Value: E3 = 123;


// 3.NonNullable 从类型中排出 null,undefined
// type NonNullable<T> = T extends null | undefined ? never : T;
type E4 = NonNullable<string | number | undefined>;
type e4<T> = NonNullable<T>;
const E4Value: E4 = 123;
const e4Value: e4<string | null> = 'string';

// 4.ReturnType 获取函数的返回值类型
// type ReturnType<T extends (...args: any[]) => any> = T extends (
//   ...args: any[]
// ) => infer R
//   ? R
//   : any;

function fn() {
  return {
    name: 'chenbin',
    age: 18,
    isStudent: false,
    language: ['js','ts',123,{
      type: 'css'
    }]
  }
}

type E5 = ReturnType<typeof fn>;


// 5.Parameters 获取函数类型的参数类型
// type Parameters<T> = T extends (...args: infer R) => any ? R : any;

type E6 = Parameters<(s: string,s2: number) => string>;
const E6Value: E6 = ['string',123];

// 6.Partial 将传入的属性由必选变为可选
// type Partial<T> = { [P in keyof T]?: T[P] };
type E7 = partial<{name: string,age: number}>;


// 7.Required 可以将传入的属性中的可选项变为必选项，这里用了 -? 修饰符来实现。
// type Required<T> = { [P in keyof T]-?: T[P] };

type E8 = Required<{name?: string,age?: number}>


// 8.Readonly 通过为传入的属性每一项都加上 readonly 修饰符来实现
// type Readonly<T> = { readonly [P in keyof T]: T[P] };
type E9 = Readonly<{name: string,age: number}>;


// 9.Pick<T, K> 能够帮助我们从传入的属性中摘取某些返回
// type Pick<T, K extends keyof T> = { [P in K]: T[P] };
interface questionInterface {
  type: string,
  name: string,
  order: number,
  options: number[]
}
const question: questionInterface = {
  type: 'radio',
  name: 'name',
  order: 1,
  options: [1,2,3]
}

type E10 = Pick<questionInterface,'type' | 'name' | 'order'>;

// 10.Record<K, T> 构造一个类型，该类型具有一组属性 K，每个属性的类型为 T
// type Record<K extends string | number | symbol, T> = { [P in K]: T; }
type E11 = Record<'name' | 123 | 'gender',string>;


// 11.Omit<K, T> 基于已经声明的类型进行属性剔除获得新类型
// type Omit=Pick<T,Exclude<keyof T,K>>
type E12 = Omit<{name:string,age: number,isStudent: boolean},'isStudent'>;

// 12.infer 
/**
 * infer 的中文是“推断”的意思，一般是搭配上面的泛型条件语句使用的，所谓推断，就是你不用预先指定在泛型列表中，在运行时会自动判断，不过你得先预定义好整体的结构。举个例子
 * type Foo<T> = T extends {t: infer Test} ? Test: string
 * 首选看 extends 后面的内容，{t: infer Test}可以看成是一个包含t属性的类型定义，这个t属性的 value 类型通过infer进行推断后会赋值给Test类型，如果泛型实际参数符合{t: infer Test}的定义那么返回的就是Test类型，否则默认给缺省的string类型。
 */

 type Foo<T> = T extends {t: infer Test} ? Test: string

 type One = Foo<number>  // string，因为number不是一个包含t的对象类型
 type Two = Foo<{t: boolean}>  // boolean，因为泛型参数匹配上了，使用了infer对应的type
 type Three = Foo<{a: number, t: () => void}> // () => void，泛型定义是参数的子集，同样适配