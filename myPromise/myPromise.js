/**
 * v2.0 完整版
 */

const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

const resolvePromise = (promise2, x, resolve, reject) => {
    if (promise2 === x) {
        return reject(new TypeError('当前的返回的promise重复调用'))
    }
    if ((typeof x == 'object' && x !== null) || typeof x == 'function') {
        let called; // 内部测试的时候，成功失败都会调用，用这个变量防止promise状态改变多次
        try {
            let then = x.then;
            if (typeof then == 'function') { // 返回一个promise,有then方法
                // then 执行,x为this指向
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject); // 可能resolve的时候参数是一个promise
                }, r => {
                    if (called) return;
                    called = true;
                    reject(r)
                })
            } else {
                // 返回一个普通对象
                resolve(x);
            }
        } catch (error) {
            if (called) return;
            called = true;
            reject(error)
        }


    } else {
        resolve(x)
    }
}

class Promise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this._resolve = [];
        this._reject = [];
        this.resolve = (value) => {
            if (this.status == REJECTED) return;
            this.value = value;
            this.status = RESOLVED
            if (this._resolve.length != 0) {
                this._resolve.forEach(fn => {
                    fn.call(this)
                })
            }
        }
        this.reject = (reason) => {
            if (this.status == RESOLVED) return;
            this.status = REJECTED;
            this.reason = reason;
            if (this._reject.length != 0) {
                this._reject.forEach(fn => {
                    fn.call(this)
                })
            }
        }
        executor(this.resolve, this.reject);
    }
    then(onFulfilled, onRejected) {
        // onFulfilled onRejected 是可选参数,如果不传默认添加一个函数为then添加返回值
        onFulfilled = onFulfilled ? onFulfilled : value => value;
        onRejected = onRejected ? onRejected : reason => {
            throw reason
        }
        // 支持链式调用，返回一个新的promise
        let promise2 = new Promise((resolve, reject) => {
            if (this.status == RESOLVED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);

                    } catch (error) {
                        reject(error)
                    }
                }, 0);
            }
            if (this.status == REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0);
            }
            if (this.status == PENDING) {
                // if (onFulfilled && typeof onFulfilled == 'function') {
                    this._resolve.push(() => {
                        setTimeout(() => {
                            try {
                                let x = onFulfilled(this.value);
                                resolvePromise(promise2, x, resolve, reject)
                            } catch (error) {
                                reject(error)
                            }
                        }, 0);
                    })
                // }
                // if (onRejected && typeof onRejected == 'function') {
                    this._reject.push(() => {
                        setTimeout(() => {
                            try {
                                let x = onRejected(this.reason);
                                resolvePromise(promise2, x, resolve, reject)
                            } catch (error) {
                                reject(error)
                            }
                        }, 0);

                    })
                // }

            }

        })
        return promise2;

    }
}
Promise.defer = Promise.deferred = function(){
    let dfd = {};
    dfd.promise = new Promise((resolve,reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
}
module.exports = Promise

// promises-aplus-tests myPromise.js