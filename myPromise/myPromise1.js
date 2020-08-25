/**
 * v1.0
 * 简单实现promise，不支持then的链式调用
 */

const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

class myPromise {
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
                    fn.call(this, value)
                })
            }
        }
        this.reject = (reason) => {
            if (this.status == RESOLVED) return;
            this.status = REJECTED;
            this.reason = reason;
            if (this._reject.length != 0) {
                this._reject.forEach(fn => {
                    fn.call(this, reason)
                })
            }
        }
        executor(this.resolve, this.reject);
    }
    then(resolveFn, rejectFn) {
        if (this.status == RESOLVED) {
            resolveFn(this.value);
        }
        if (this.status == REJECTED) {
            rejectFn(this.reason);
        }
        if (this.status == PENDING) {
            if (resolveFn && typeof resolveFn == 'function') {
                this._resolve.push(resolveFn)
            }
            if (rejectFn && typeof rejectFn == 'function') {
                this._reject.push(rejectFn)
            }
        }

    }
}
exports.myPromise = myPromise;