const express = require('express');
const app = express();
const path = require('path');
const route = require('./route')

// 处理静态资源
app.use('/pku', express.static(path.join(__dirname, '/pku')))
app.use('/dist', express.static(path.join(__dirname, '/dist')))
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')))

// 处理跨域和options请求
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    if (req.method.toLowerCase() == 'options') {
        res.sendStatus(200); //让options尝试请求快速结束
    } else {
        next();
    }
})


// 添加路由
app.use(route)



app.listen(3000, () => {
    console.log('start server on 3000')
})