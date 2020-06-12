const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
    mode:'development',
    entry:{
        index:'./src/main.js',
        survey:'./src/a.js'
    }, // 对象形式就会打包为多个js，配置下面的htmlwebpackplugin的chunks就会在对应的html中引入对应的js
    // entry:['./src/a.js','./src/main.js'], // 如果是数组，将会将两个文件打包成一个文件最终引入一个html中
    output:{
        filename:'[name].js',
        path:path.resolve('./build')
    },
    devServer:{
        contentBase:'./build',
        open:true,
        port:8089
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./index.html',
            filename:'index.html',
            title:'index.html',
            chunks:['index']
        }),
        new HtmlWebpackPlugin({
            template:'./survey.html',
            filename:'survey.html',
            title:'survey.html',
            chunks:['survey']
        }),
        new cleanWebpackPlugin(),
        new CopyPlugin([
            { from: 'css', to: 'css' },// to指定的是文件夹名字，不需要指定copy入哪个文件夹，因为插件本来的作用就是拷贝进打包后的目录
          ]),
    ],
    module:{
        rules:[
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/}
        ]
    }
    
}