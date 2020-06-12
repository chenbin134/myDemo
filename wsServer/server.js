const WebSocket = require('ws');
const ws = new WebSocket.Server({
    port : 8081
});
ws.on('connection',function(socket){

    console.log('client connected' + socket);
    socket.send('服务器响应的数据');
    socket.onmessage = function(msg){
    console.log(msg.data);
    socket.send(msg.data);
}
});
