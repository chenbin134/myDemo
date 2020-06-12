const http = require('http');
const path = require('path');
const URL = require('url');
const fs = require('fs');
const mime = require('mime');

// 根据输入的路径响应页面，
http.createServer((req,res) => {
    let url = req.url;
    // console.log(url);
    // console.log(URL.parse(url)); 
    // res.write(path.join(__dirname,'/pku',URL.parse(url).pathname));
    fs.readFile(path.join(__dirname,'/pku',URL.parse(url).pathname),(err,data)=> {
        if(err){// 找不到页面，读取文件失败
            res.statusCode = 404;
            res.setHeader('Content-Type','text/palin;charset=utf-8');
            res.end('抱歉，页面走丢了');
        } else {// 响应请求页面
            // if(!fs.existsSync(path.join(__dirname,'/pku','write.html'))){// 如果文件不存在，则写入文件，
                 
            //     fs.writeFile(path.join(__dirname,'/pku','write.html'),data,(err)=> {
            //         if(err) throw err
            //         console.log('写入完成');
            //     });
            // } 

            // 根据响应的文件不同，动态设置content-type，
            // 使用第三方的模块mime，自动根据请求文件的扩展名返回对应contenttype
            console.log(mime.getType(path.join(__dirname,'/pku',URL.parse(url).pathname)));
            res.setHeader('Content-Type',mime.getType(path.join(__dirname,'/pku',URL.parse(url).pathname)));
            res.write(data);
            res.end();
        }
    })
}).listen(8080);