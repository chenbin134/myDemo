// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]


// ============= Your Code Here =============

// 将字符串split拆分成数组，'abcdef' => [a,b,c,d,e,f],然后取length
type toArray<S extends string> = S extends `${infer L}${infer R}` ? [L,...toArray<R>] : [];

type LengthOfString<S extends string> = toArray<S>['length'];
