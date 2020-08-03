const Vue = require('vue');
const serve = require('express')();
const renderer = require('vue-server-renderer').createRenderer();


serve.get('*', function (req, res) {
    const app = new Vue({
        data: {
            url: req.url,
            message:'Hello World'
        },
        template: `<div>访问的是url是：{{url}}。<span style='color:red'>{{message}}</span></div>`
    })
    renderer.renderToString(app, (err, html) => {
        if (err) {
            res.status(500).end('Internal Server Error');
            return;
        }
        res.set('content-Type','text/html').end(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `)
    })
})


serve.listen(8080);