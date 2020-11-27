/**
 * 简单模拟webapck打包以及处理依赖,执行后生成dist/bundle.js
 */
const fs = require('fs')
const path = require('path')
const bableParser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

const getModuleInfo = (file) => {

  try {
    const body = fs.readFileSync(file, 'utf-8');
    // ast
    const ast = bableParser.parse(body, {
      sourceType: 'module'
    })
    // console.log(ast.program.body)
    // 找依赖
    const deps = {};
    traverse(ast, {
      ImportDeclaration({node}) {
        const dirname = path.dirname(file);
        const abspath = './' + path.join(dirname, node.source.value);
        deps[node.source.value] = abspath;
      }
    })
    // 转换语法 codegen
    const { code } = babel.transformFromAst(ast, null, {
      presets: ["@babel/preset-env"]
    })
    // console.log(code)
    const moduleInfo = {
      file,
      deps,
      code
    }

    return moduleInfo

  } catch (error) {
    console.log(error)
  }

}


// 递归获取所有模块依赖、内容并转换为文件的路径为key，{code，deps}为值的形式存储
const parseModule = (file) => {

  const entry = getModuleInfo(file)
  const temp = [entry];
  const deps = entry.deps || {};
  const depsGraph = {}
  for (let key in deps) {
    if (deps.hasOwnProperty(key)) {
      temp.push(getModuleInfo(deps[key]))
    }
  }
  // console.log(temp)
  temp.forEach(moduleInfo => {
    depsGraph[moduleInfo.file] = {
      deps:moduleInfo.deps,
      code:moduleInfo.code
    }
  })
  // console.log(depsGraph)
  return depsGraph
}

const bundle = (file) => {
  const depsGraph = JSON.stringify(parseModule(file))
  return `(function (graph) {
      function require(file) {
          function absRequire(relPath) {
              return require(graph[file].deps[relPath])
          }
          var exports = {};
          (function (require,exports,code) {
              eval(code)
          })(absRequire,exports,graph[file].code)
          return exports
      }
      require('${file}')
  })(${depsGraph})`
}

const content = bundle('./src/index.js')

if(fs.existsSync('./dist/bundle.js')) {

  fs.unlinkSync('./dist/bundle.js')

}

// fs.mkdirSync('./dist');

fs.writeFileSync('./dist/bundle.js',content)



