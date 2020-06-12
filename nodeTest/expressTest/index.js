const express = require('express');
const app = express();
const path = require('path');

// 处理静态资源
app.use('/pku', express.static(path.join(__dirname, '/pku')))

// 完全匹配get方法和/路径
app.get('/', (req, res, next) => {
    console.log(req)
    res.send({ status: 0, msg: 'success' });
})
app.post('/post', (req, res, next) => {
    res.send({ status: 0, msg: 'success' });
})

// 任何方法匹配，路径以/method开头，如果没有具体路径，则匹配所有
app.use('/method', (req, res, next) => {
    res.send({ status: 1, msg: '/method' })
})

// 任何方法匹配，路径完全匹配
app.all('/all', (req, res, next) => {
    res.send({ status: '200' });
})

app.use((req, res) => [
    res.send({ status: '404 not found' })
])



app.listen(3000, () => {
    console.log('start server on 3000')
})