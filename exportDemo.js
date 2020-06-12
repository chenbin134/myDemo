//先定义再导出
const a = 1;
const b = 2;
function exportFun(){
    console.debug('test');
}
const obj = {
    name : 'jamse',
    age :  13,
    sex : 'male'
}

// export {a}
// export {b}
// export {exportFun}
// export {obj}
export {a,b,exportFun ,obj}
export default obj

//直接导出
export let first = 'first';
export const fun1 = function(){console.log('fun1');}
export function fun2(){console.log('fun2');}
export const myObj = {name : 'hhhh'}
export const fun3 = () => console.log('fun3');
// export default {name:'ccc'}
// 只能有一个默认导出