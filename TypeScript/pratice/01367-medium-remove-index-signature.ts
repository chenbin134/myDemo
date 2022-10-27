// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Foo = {
  [key: string]: any
  foo(): void
}

type Bar = {
  [key: number]: any
  bar(): void
  0: string
}

const foobar = Symbol('foobar')
type FooBar = {
  [key: symbol]: any
  [foobar](): void
}

type Baz = {
  bar(): void
  baz: string
}

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void; 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>,
]


// ============= Your Code Here =============
type RemoveIndexSignature<T extends Record<any,any>> = {
  [K in keyof T as string extends K ? never : number extends K ? never : symbol extends K ? never : K ]: T[K] 
}

// keyof {[key: string]: any} 得到 string | number
// keyof {[key: number]: any} 得到 numebr
// keyof {[key: symbol]: any} 得到 symbol
// 关键点是区分上述的索引签名(string | number | symbol)和普通的key
type test = keyof {
  [key: number]: any;
}
type test1 = keyof {
  [key: string]: any;
};
type test2 = keyof {
  [key: symbol]: any;
};