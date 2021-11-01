"use strict";
function add(a, b, c) {
    if (c === void 0) { c = 0.5; }
    return a + b;
}
// add('aa',2)
add(2, 3);
var name1 = 'chenbin'; // 自动推断类型为string
name1 = 123;
var name2 = 123;
name2 = 'chenbin';
var arr = [1, 2, 3, 4, '55'];
arr.push('666', true, 123, 'bbb');
var obj = {
    name: 'chenbin',
    age: 20,
    hobby: ['study', 'sleep']
};
var age = obj.age; // 自动推断类型为number
age = 'strging';
var obj2 = {
    name: 'chenbin',
    age: '12',
    gender: 1
};
var obj3 = {};
obj3 = 123;
obj3 = {
    name: 'chenbin'
};
var v = 'chenbin';
var aa = v; // v是unknow类型，aa是string，所以不能接收
var bb = v;
var v1 = 123;
var aa1 = v1;
var bb2 = v1;
var n = null;
var u = undefined;
function fn() {
    // return 'aaa'
    // return undefined;
    // return true;
    // return null;
}
var func = function () { };
function create(params) {
}
create({
    id: 123,
    method: 'add',
    order: {
        desc: true
    }
});
function create2(params) {
}
create2({
    id: 123,
    method: 'add',
    order: {
        desc: false
    }
});
var fun; // 函数的定义 ，类似let s:string; s = 'abc';定义和实现时的形参的变量名可以不一样；
func = function (x, y) {
    return x + y;
};
var fun2 = function (x, y) {
    return x + y;
};
var fun3 = function (x, y) {
    return x + y;
};
// 元组
var tuple = ['string', 123];
