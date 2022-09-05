// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>,
]


// ============= Your Code Here =============

// 先消除左边，再消除右边。。。
type whiteSpace = `${' ' | '\n' | '\t'}`;
type TrimLeft<S extends string> = S extends `${whiteSpace}${infer Right}` ? TrimLeft<Right> : S;
type TrimRight<S extends string> = S extends `${infer Left}${whiteSpace}` ? TrimRight<Left> : S;

type Trim<S extends string> = TrimLeft<TrimRight<S>>
