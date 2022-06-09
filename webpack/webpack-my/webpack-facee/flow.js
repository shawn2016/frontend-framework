 
 
let {SyncHook} = require('tapable');
let path = require('path')
const fs = require("fs")
class Compiler{
  constructor(options){
    this.options = options;
    this.hooks = {
      run:new SyncHook(),
      down:new SyncHook()
    }
  }
  //进行开始编译的流程
  run(){
    let modules = [];
    let chunks = [];
    let files = []
    //触发run的钩子执行
   this.hooks.run.call();
   //确定入口 根据配置中entry找到所有的入口条件
   let entry = path.join(this.options.context,this.options.entry)
   /**
    * 3. 编译过程，从入口出发，编译文件中所需要的以来条件，在递归本步骤，查找问额间的所有步骤
    */
   //3.1 读取文件内容，
   let entryContent = fs.readFileSync(entry,"utf8");
   let entrySource =  babelLoader(entryContent);
   //模块module  chunk 代码块 file bundle的文件关系
   let entryModule = {id:entry,source:entrySource}
   modules.push(entryModule)
   //编译 把入口模块的代码转换换成抽象语法树，来分析里面的import和require的以来
   
   //完成模块编译 转换关系 输出资源 根据入口和模块关系，组长成一个或者多个Chunk
   let chunk = {name:'main',modules};
    chunks.push(chunk)
    //把trunk 转化成一个单独的文件，加入到输出列表中
    let file = {
      file:this.options.output.filename,
      source:'(function(){})()'
    }
    files.push(file)
    //在确定好输出内容后，根据配置的文件和文件名输入到文件系统
    let outputPath = path.join(
      this.options.outpuut.path,
      this.options.output.filename
    );
    fs.writeFileSync(outputPath,file.source,'utf8')
     //以上过程 webpack 会在特定的时间点广播特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑
     //并且插件可以调用webpack 提供的api改变webpack的运行结果
    this.hooks.done.call();
  }
}
/**
 * 1.初始化参数,从配置文件和脚本中合并参数，生成最终的参数
 */
let options = require("./webpack.config.js");
/**
 * 2.开始编译，用合并后的最终参数，初始化webpack对象
 */
let compiler = new Compiler(options);
//加载所有的plugins，执行对象的run方法进行开始编译
if(options.plugins && Array.isArray(options.plugins)){
  for(const plugin of options.plugins){
    //调用applay的方法
    plugin.apply(compiler);
  }
}
compiler.run(); 

//编译
function babelLoader(source){
   
}

