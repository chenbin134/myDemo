/**
 * 手动实现 call 函数 2020/8/26
 */

// v1.0
Function.prototype.myCall = function (context, ...args) {
    context = context || window;
    let fn = this;
    context.fn = fn;
    let result = context.fn(...args);
    delete context.fn;
    return result;
}

//  v 2.0
//  在ECMAScript 3和非严格模式中，传入call的第一个参数，如果传入的值为null或者undefined都会被全局对象代替，
//  而其他的原始值则会被相应的包装对象（wrapper object）所替代。
//  所有的引用类型（array/object/function），
//  都具有对象特性，即可自由扩展属性（null除外） ，
//  所以除了引用类型和null/undefined外，
//  其他数据类型要转化为相应的包装类型，使其可以扩展属性。
Function.prototype.myCall = function (context, ...args) {
    // 区分 node环境 or 浏览器环境
    let globalEnv;
    try {
        window
    } catch (error) {
        globalEnv = global
    }
    try {
        global
    } catch (error) {
        globalEnv = window 
    }
    // 新增代码
    let type = typeof context;
    if (type === undefined || context === null) {
        type = 'window';
    }
    switch (type) {
        case 'window':
            context = globalEnv;
            break;
        case 'number':
            context = Number(context)
            break;
        case 'string':
            context = String(context)
            break;
        case 'boolean':
            context = Boolean(context)
            break
        default:
            context = context
            break;
    }
    let fn = this;
    context.fn = fn;
    let result = context.fn(...args)
    delete context.fn;
    return result;

}

//  test

let obj = {
    name: 'chenbin'
};
global.name = 'cb'; // global 为node中全局变量

function sayName(age, gender, address) {
    console.log(arguments)
    console.log(this.name + age);
    return 'my age is ' + age;
}
let r = sayName(23);
let r1 = sayName.call(obj, 23)
let r2 = sayName.myCall(obj, 24, '男', '北京')
sayName.myCall(null,24,'男','beijing')