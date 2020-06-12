
// 返回start 和end 之间的随机数
export const getRandom = (start,end) =>{
    return parseInt(Math.random() * (end - start) + start);
}


// bable将es6的语法转换成了commonjs的规范，所以还是没有办法在浏览器环境运行，需要借助打包工具来完成
// 使用bable-cli转换好的commonjs规范的js代码在lib文件夹 babel-cli src -d lib 命令将src文件夹中的es6文件转换并放到lib文件夹中

// 使用webpack直接打包，webpack会默认将es5转换为低版本js ，全局安装webpack，使用webpack命令，默认会找到根目录src中的index.js进行入口打包，出口时dist/main.js，页面引入main就ok