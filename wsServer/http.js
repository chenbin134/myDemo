const http = require('http');
// http.createServer(function(req,res){
//     console.log(req.url);
//     res.write('hello');
//     res.end();
// }).listen(8080,function(){
//     console.log('request is coming');
// });
const server = http.createServer();
server.on('request',function(req,res){
    res.setHeader('Content-Type','text/plain;charset=utf-8');
    res.statusCode  = 500
    console.log(req.url);
    // res.write('你好,<h1>hhhh</h1>');
    res.write('{name:1}');
    res.end();
});
server.listen(8080,function(){
    console.log('localhost:8080');
});