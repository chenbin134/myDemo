const path = require('path');
const fs = require('fs');
const { prompt } = require('enquirer');
const argv = require('minimist')(process.argv.slice(2));
const {
  yellow,
  green,
  cyan,
  magenta,
  lightRed,
  red,
} = require('kolorist');



const cwd = process.cwd();

const FRAMEWORKS = [ // 预先定义好可供选择的模版列表
  {
    name:'vue',
    color:'green',
    variants:[
      {
        name:'vue',
        color:'yellow',
      },
      {
        name:'vue-ts',
        color:'blue'
      }
    ]
  },
  {
    name:'react',
    color:'cyan',
    variants:[
      {
        name:'react',
        color:'lightRed'
      },
      {
        name:'react-ts',
        color:'red'
      }
    ]
  },
  {
    name:'others',
    color:'magenta'
  }
]

// 所有模版的name组成的数组
const TEMPLATES = FRAMEWORKS.map(
  f => (f.variants && f.variants.map(v => v.name)) || [f.name]
).reduce((a,b) => a.concat(b),[]);


async function init(){
  
  let targetDir = argv._[0];// 创建的项目文件夹名
  let template = argv.template;// 输入命令中获取到的要使用的模版名字参数

  if(!targetDir){// 没有输入参数
    let { dirName } = await prompt({
      type:'input',
      name:'dirName',
      message:'please input your project name:',
      initial:'viteDemo',// 默认值
    })
    targetDir = dirName;
  }
  const root = path.join(cwd,targetDir);// 项目创建的完整文件路径

  console.log(yellow(`将在${root}路径下创建项目文件夹...`))

  // 判断目标地址文件夹是否存在
  if(!fs.existsSync(root)) {
    fs.mkdirSync(root);
  }

  const existing = fs.readdirSync(root);

  if(existing.length > 0){
    let { yes } = await prompt({
      type:'confirm',
      name:'yes',
      initial: 'Y',
      message:`目标文件夹${targetDir}不为空，是否清空文件夹中的内容并继续？`
    })
    if(yes){
      emptyDir(root)
    } else {
      console.log(red('流程结束,Operation cancelled'))
      return;
    }

  }
  // 确定模版名称
  // let { t } = await prompt({
  //   type: 
  // }) 

}

/**
 * 清空指定目录下的文件
 */
function emptyDir(dir){
  console.log(red('clear'))
}

init();






  