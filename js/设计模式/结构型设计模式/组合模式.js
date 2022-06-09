 
/**
 * 实现组合模式的需求
 * 　文件夹和文件之间的关系，非常适合用组合模式来描述。
 * 文件夹里既可以包含文件，又可以包含其他文件夹，最终可能组合成一棵树，
 * 组合模式在文件夹的应用中有以下两层好处
 */
var Folder = function(name){
  this.name = name;
  this.files = [];//文件夹下面的文件目录
  this.parent=null;

}
//添加文件
Folder.prototype.add=function(file){
  file.parent = this;
  this.files.push(file)
}
Folder.prototype.remove = function(){
  //移除某一个文件夹
  if(!this.parent){
    ////根节点或者树外的游离节点
    return 
  }
  var files = this.parent.files;
  for(var i=files.length;i>=0;i--){
    var file = files[i]
    if(file == this){
      files.splice(i,1) //如果当前删除的文件夹和当前的this相等 则进行删除
    }
  }
}
//扫描
Folder.prototype.scan = function(){
  this.files.forEach((item,index)=>{
    //扫描下面的文件
    item.scan();
  })
}
var File = function(name){
  this.name = name; 
  this.parent=null;
}
File.prototype.add=function(){
  throw new Error( '文件下面不能再添加文件' );
}
File.prototype.scan=function(){
  console.log("扫描的文件的名字为"+this.name)
}
File.prototype.remove = function(){
  //移除某一个文件夹
  if(!this.parent){
    ////根节点或者树外的游离节点
    return 
  }
  var files = this.parent.files;
  for(var i=files.length;i>=0;i--){
    var file = files[i]
    if(file == this){
      files.splice(i,1)
    }
  }
}
var f1 = new File("eee")
var f2 = new File("mingyang")
var fo1 = new Folder("love")
var fo2 = new Folder("time")
fo1.add(f1);
fo1.add(f2);
fo1.add(fo2) 
console.log(fo1)
fo2.remove();
console.log(fo2)
console.log(fo1)
fo1.scan();


//开关电视机

/**
 * 相关命令
 * 1.开门
 * 2.打开电脑
 * 3.登录QQ
 */

 var closeDoorCommond={
   excute:()=>{
     console.log("关门")
   }
 }
 var openPcCommond={
   excute:()=>{
     console.log("开电脑")
   }
 }
 var openQQCommond={
   excute:()=>{
     console.log("登录QQ")
   }
 }

 var macroCommond=function(){
   return{
    commandsList:[],
    add:function(command){
      this.commandsList.push(command)
    },
    excute:function(){
      for(var i=0,command;command=this.commandsList[i++];){
           command.excute();
      }
    }
   }
 }
 //添加命令
 var macroCommand = MacroCommand();
macroCommand.add( closeDoorCommand );
macroCommand.add( openPcCommand );
macroCommand.add( openQQCommand );
macroCommand.execute();