
const http = require('http');
const URL = require('url');
const queryString = require('querystring');
http.createServer((req,res) => {
    let url = req.url;
    let method = req.method;
    if(method == 'GET'){
       const param = URL.parse(url,true).query;// 使用url模块来获取get请求的参数，如果为true，则会将querystring转为对象形式
    //    res.statusCode = 500
       res.setHeader('Content-Type','application/json;charset=utf-8');
       res.setHeader('Access-Control-Allow-Origin','*');
       res.write(JSON.stringify(param));
       res.end();
    } else if(method == 'POST'){
        let data = '';
        req.on('data',chunk=> {
            data += chunk;
        })
        req.on('end',()=> {
            console.log(data);
           const qs =  queryString.parse(data);// 使用querystring模块的parse方法将id=1&uid=afafdfd-f989f0fd-fdfs转为对象形式，但是，这个返回的对象不是继承者object，所以tostring等方法不能用
           console.log(qs);
            const obj = {
                status : 0,
                msg : 'success',
                ...qs
            }
            console.log(obj);
            // res.statusCode = 400;
            res.setHeader('content-Type','application/json;charset=utf-8');
            res.setHeader('Access-Control-Allow-Origin','*');
            res.write(JSON.stringify(obj));
            res.end();
        })

    }
}).listen(3000,()=>{console.log('start')});