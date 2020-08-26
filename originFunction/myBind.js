/**
 * 手动实现 bind 函数 2020/8/26
 */
// https://juejin.im/post/6844904042452221960#heading-8

//  未考虑new 以及返回方法的prototype 的情况
 Function.prototype.myBind = function(context,...args){
     let fn = this;
     context.fn = fn;
    return function F(...arg2) {
        if(this instanceof F) {//因为返回了一个函数，可以new F(),所以需要判断
            return new fn(...args,...arg2)
        }
        let res = context.fn(...args,...arg2)
        delete context.fn;
        return res;
    }
 }

//  test
let obj = {name:'chenbin'};
global.name = 'cb';

function sayName(){
    console.log(this.name)
}
let fn = sayName.myBind(obj);
fn();