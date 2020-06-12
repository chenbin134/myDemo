console.log('a.js')

function fun(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('promise async')
            resolve(1)
        }, 3000);
    })
}

fun().then(function(res){
    console.log(res)
})