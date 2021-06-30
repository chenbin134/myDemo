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
  stripColors
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
  if(!template || !TEMPLATES.includes(template)) {
    let { t } = await prompt({
      type:'select',
      name: "t",
      message: "Select a template:",
      choices: TEMPLATES
    })
    template = stripColors(t);
  }

  const templateDir = path.join(__dirname,`template-${template}`);

  // 开始将模版内容写入到创建的文件夹中
  
  for(const file of fs.readdirSync(templateDir)){

    copy(path.join(templateDir,file),path.join(root,file));

  }
  

}

/**
 * 清空指定目录下的文件
 * @param dir 要清空目录的绝对地址
 */
function emptyDir(dir){
  if(!fs.existsSync(dir)) {
    return;
  }
  for(const file of fs.readdirSync(dir)) {
    const abs = path.resolve(dir,file);
    if(fs.lstatSync(abs).isDirectory()){
      emptyDir(abs);
      fs.rmdirSync(abs);
    } else {
      fs.unlinkSync(abs);
    }
  }
}

/**
 * 复制文件(夹)
 * @param src 目标文件
 * @param dest 当前位置
 */
function copy(src,dest){
  const stat = fs.statSync(src);
  if(stat.isDirectory()){
    copyDir(src,dest);
  } else {
    fs.copyFileSync(src,dest);
  }
}

function copyDir(srcDir,destDir){
  fs.mkdirSync(destDir,{ recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }

}

init();






  