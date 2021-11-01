// 装饰器 decorator
// decorator 是实验功能，需要将ts配置文件中的decorator相关的配置放开


// 类装饰器
const messageDecotor:ClassDecorator = (target:Function)=> {
  target.prototype.message = (content:string):void => {
    console.log(content)
  }
}

// 也可以根据参数返回不同的处理函数
// 类装饰器就是一个ClassDecorator的函数
const roleDecorator = (role:string):ClassDecorator => {
  console.log(role);
  if(role == '1') {
    return (target:Function) => {
      console.log('role == doctor')
    }
  } else {
    return (target:Function) => {
      console.log('patient')
    }

  }
}

@messageDecotor
@roleDecorator('1')
class cls{

}

const o = new cls();

o.message('bbbbb')