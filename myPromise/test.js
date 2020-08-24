let { myPromise } = require('./myPromise');
let promise = new myPromise((resolve, reject) => {
    console.log('executor is called')
    // setTimeout(() => {
        resolve('response');
        reject('出错了')
    // }, 2000);
});

promise.then((res) => {
    console.log('success')
    console.log(res)
}).then(res => {
    console.log(res)
})
