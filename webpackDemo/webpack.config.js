const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.export = {
    mode:'production',
    plugins:[
        new htmlWebpackPlugin({
            template:path.resolve(__dirname,'src/index.html'),
            filename:'index.html'

        })
    ]


}