const Vue = require('vue')
const server = require('express')();
const fs = require('fs')
const path = require('path')
const template = fs.readFileSync(path.join(__dirname,'../template/index.template.html'),'utf-8');
const renderer = require('vue-server-renderer').createRenderer({
    template : template
});

const context = {
    message : 'hello world'
}
server.get('*',(req,res)=> {
    const app = new Vue({
        data: {
            url: req.url
          },
          template: `<div>访问的 URL 是： {{ url }}</div>`,
    })
    renderer.renderToString(app,context,(err,html)=> {
        if(err){
            res.status(500);
            return;
        }
        // console.log(html)
        res.set('content-Type','text/html').end(html)
    })
})

server.listen(8080)