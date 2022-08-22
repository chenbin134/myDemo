// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>,
]


// ============= Your Code Here =============

// 1
type TupleToUnion<T extends any[]> = T[number];

// 2
type TupleToUnion2<T> = T extends Array<infer U> ? U : never;
type TupleToUnion3<T> = T extends (infer U)[] ? U : never;