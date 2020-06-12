const express = require('express');
const route = express.Router();
const boydParser = require('body-parser');

const parsejson = boydParser.json(); // 将请求的json接受并放到req.body上,处理application/json格式数据

// 完全匹配get方法和/路径
route.get('/',(req,res,next) => {
    console.log(req)
    res.send('<h1>get请求</h1>');
})
// 接受post请求参数
route.post('/post',parsejson,(req,res,next) => {
    console.log(req.body);
    res.send(req.body)
})

// 任何方法匹配，路径以/method开头，如果没有具体路径，则匹配所有
route.use('/method',(req,res,next) => {
    res.send({status:1,msg:'/method'})
})

// 任何方法匹配，路径完全匹配
route.all('/all',(req,res,next) => {
    res.send({status:'200',msg:'/all'});
})

route.use((req,res) => [
    res.send({status:'404 not found'})
])

module.exports = route