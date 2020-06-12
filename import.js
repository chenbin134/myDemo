import {a ,b ,exportFun,obj} from './exportDemo.js'
import defaultObj from './exportDemo.js'
console.log(a);
console.log(b);
console.log(exportFun);
console.log(obj);
console.log(defaultObj);


// import {first,fun1,fun2,fun3,myObj} from './exportDemo.js'
// console.log(first);
// console.log(fun1);
// fun1();
// console.log(fun2);
// fun2();
// fun3();
// console.log(myObj);
import * as myModule from './exportDemo.js'
console.log(myModule);


// import aa from './exportDemo.js'
// console.log(aa);