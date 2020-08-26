/**
 * 手动实现 apply 函数 2020/8/26
 */

Function.prototype.myApply = function(context,args){
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

    let type = typeof context;
    if(type === undefined || context === null) {
        type = 'window'
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
    let result = context.fn(...args);
    delete context.fn;
    return result;

}

// test
let obj = {name:'chenbin'}
global.name = 'cb'

function sayName(age,gender,address){
    console.log(this.name);
    console.log(age,gender,address)
}
sayName(12,'男','beijing');
sayName.apply(obj,[13,'男','china'])
sayName.myApply(obj,[23,'男','北京'])
sayName.myApply(null,[24,'男','北京市'])