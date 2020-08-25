let { myPromise } = require('./myPromise');
let promise = new myPromise((resolve, reject) => {
    console.log('executor is called')
    setTimeout(() => {
        reject('出错了')
        resolve('response');
    }, 2000);
});

promise.then().then(res => {
    console.log(res)
},err => {
    console.log(err)
})
// (res) => {
//     console.log('success')
//     console.log(res);
//     return new myPromise((resolve,reject) => {
//         setTimeout(() => {
//             resolve(3000)
//         }, 1000);
//     })
// }
