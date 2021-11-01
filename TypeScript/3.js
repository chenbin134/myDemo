"use strict";
// 泛型
function a(arg) {
    return arg;
}
var r = a('aaaa');
function b(arg) {
    return arg;
}
var r2 = b(true);
// 以上俩个函数，其实函数的作用相同(都是返回传入的参数)，只是因为参数类型以及返回类型不同，导致不能复用为一个函数
// 因此，泛型可以解决这个问题，可以根据泛型传入的类型，自动推断参数类型以及返回的类型，可以理解为一个变量
function common(arg) {
    return arg;
}
var result1 = common('string');
var resutl2 = common(true);
var result3 = common('string');
var collection = /** @class */ (function () {
    function collection() {
        this.data = [];
    }
    collection.prototype.push = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this.data).push.apply(_a, args);
    };
    collection.prototype.read = function () {
        console.log(this.data);
    };
    return collection;
}());
var collection1 = new collection();
collection1.push(1, 2, 3, 4);
var collection2 = new collection();
collection2.push('string', 'string');
var usr = { name: 'chenbin', age: 18 };
var collection3 = new collection();
collection3.push(usr, usr);
var studentObj = {
    name: 'chenbin',
    age: 18,
    hasBook: true,
    hobby: [{
            name: 'basketball'
        }],
    scores: [1, 2, 3, 4]
};
