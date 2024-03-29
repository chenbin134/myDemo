// https://github.com/substack/node-smtp-protocol  
// node 实现邮箱服务器
var smtp = require('smtp-protocol');

var server = smtp.createServer(function (req) {
    req.on('to', function (to, ack) {
        var domain = to.split('@')[1] || 'example.com';
        if (domain === 'example.com') ack.accept()
        else ack.reject()
    });
    
    req.on('message', function (stream, ack) {
        console.log('from: ' + req.from);
        console.log('to: ' + req.to);
        
        stream.pipe(process.stdout, { end : false });
        ack.accept();
    });
});

server.listen(9025);